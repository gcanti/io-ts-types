import * as assert from 'assert'
import * as t from 'io-ts'

import {
  AnyStringPrism,
  DateFromISOString,
  DateFromNumber,
  DateFromUnixTime,
  IntegerFromString,
  JSONFromString,
  JSONTypeRT,
  NumberFromString,
  StringJSONPrism,
  StringNumberPrism,
  createEitherFromJSON,
  createOptionFromJSON,
  createOptionFromNullable,
  createRange,
  fromNewtype,
  lensesFromProps
} from '../src'
import { Left, Right, left, right } from 'fp-ts/lib/Either'
import { None, Some, none, some } from 'fp-ts/lib/Option'
import { fromRight, fromSome } from './helpers'

import { Newtype } from 'newtype-ts'
import { Validation } from 'io-ts'

describe('fp-ts', () => {
  it('createOptionFromNullable', () => {
    const T = createOptionFromNullable(t.number)
    assert.ok(fromRight(t.validate(null, T)) instanceof None)
    assert.ok(fromRight(t.validate(undefined, T)) instanceof None)
    assert.ok(fromRight(t.validate(1, T)) instanceof Some)
    assert.deepEqual(T.serialize(some(1)), 1)
    assert.deepEqual(T.serialize(none), null)
  })

  it('createOptionFromJSON', () => {
    const T = createOptionFromJSON(t.number)
    assert.ok(fromRight(t.validate({ type: 'Option', value: null }, T)) instanceof None)
    assert.ok(fromRight(t.validate({ type: 'Option', value: undefined }, T)) instanceof None)
    assert.ok(fromRight(t.validate({ type: 'Option', value: 1 }, T)) instanceof Some)
    assert.deepEqual(T.serialize(some(1)), { type: 'Option', value: 1 })
    assert.deepEqual(T.serialize(none), { type: 'Option', value: null })
  })

  it('createOptionOfOptionFromJSON', () => {
    const T = createOptionFromJSON(createOptionFromJSON(t.number))
    assert.deepEqual(fromRight(t.validate({ type: 'Option', value: { type: 'Option', value: 1 } }, T)), some(some(1)))
    assert.deepEqual(T.serialize(some(some(1))), { type: 'Option', value: { type: 'Option', value: 1 } })
    assert.deepEqual(T.serialize(some(none)), { type: 'Option', value: { type: 'Option', value: null } })
    assert.deepEqual(fromRight(t.validate({ type: 'Option', value: { type: 'Option', value: null } }, T)), some(none))
    assert.deepEqual(T.serialize(none), { type: 'Option', value: null })
    assert.deepEqual(fromRight(t.validate({ type: 'Option', value: null }, T)), none)
  })

  it('createEitherFromJSON', () => {
    const T = createEitherFromJSON(t.string, t.number)
    assert.ok(fromRight(t.validate({ type: 'Left', value: 's' }, T)) instanceof Left)
    assert.ok(fromRight(t.validate({ type: 'Right', value: 1 }, T)) instanceof Right)
    assert.deepEqual(T.serialize(left('a')), { type: 'Left', value: 'a' })
    assert.deepEqual(T.serialize(right(1)), { type: 'Right', value: 1 })
  })

  it('createEitherOfOptionFromJSON', () => {
    const T = createEitherFromJSON(createOptionFromJSON(t.string), createOptionFromJSON(t.number))
    assert.deepEqual(fromRight(t.validate({ type: 'Left', value: { type: 'Option', value: 's' } }, T)), left(some('s')))
    assert.deepEqual(fromRight(t.validate({ type: 'Right', value: { type: 'Option', value: 1 } }, T)), right(some(1)))
    assert.deepEqual(fromRight(t.validate({ type: 'Left', value: { type: 'Option', value: null } }, T)), left(none))
    assert.deepEqual(fromRight(t.validate({ type: 'Right', value: { type: 'Option', value: null } }, T)), right(none))
    assert.deepEqual(T.serialize(left(some('a'))), { type: 'Left', value: { type: 'Option', value: 'a' } })
    assert.deepEqual(T.serialize(right(some(1))), { type: 'Right', value: { type: 'Option', value: 1 } })
    assert.deepEqual(T.serialize(left(none)), { type: 'Left', value: { type: 'Option', value: null } })
    assert.deepEqual(T.serialize(right(none)), { type: 'Right', value: { type: 'Option', value: null } })
  })

})

describe('number', () => {
  it('createRange', () => {
    const T = createRange(t.number, 0, 10)
    assert.strictEqual(fromRight(t.validate(0, T)), 0)
    assert.strictEqual(fromRight(t.validate(10, T)), 10)
    assert.strictEqual(fromRight(t.validate(5.5, T)), 5.5)
    assert.ok(t.validate(-1, T) instanceof Left)
    assert.ok(t.validate(11, T) instanceof Left)
    const TT = createRange(t.Integer, 0, 10)
    assert.strictEqual(fromRight(t.validate(0, TT)), 0)
    assert.strictEqual(fromRight(t.validate(10, TT)), 10)
    assert.ok(t.validate(5.5, TT) instanceof Left)
    assert.ok(t.validate(-1, TT) instanceof Left)
    assert.ok(t.validate(11, TT) instanceof Left)
  })

  it('NumberFromString', () => {
    const T = NumberFromString
    assert.strictEqual(fromRight(t.validate('0', T)), 0)
    assert.strictEqual(fromRight(t.validate('10', T)), 10)
    assert.strictEqual(fromRight(t.validate('-1', T)), -1)
    assert.strictEqual(fromRight(t.validate('11', T)), 11)
    assert.strictEqual(fromRight(t.validate('5.5', T)), 5.5)
    assert.strictEqual(fromRight(t.validate('-5.5', T)), -5.5)
  })

  it('IntegerFromString', () => {
    const T = IntegerFromString
    assert.strictEqual(fromRight(t.validate('0', T)), 0)
    assert.strictEqual(fromRight(t.validate('10', T)), 10)
    assert.strictEqual(fromRight(t.validate('-1', T)), -1)
    assert.strictEqual(fromRight(t.validate('11', T)), 11)
    assert.ok(t.validate('5.5', T) instanceof Left)
    assert.ok(t.validate('-5.5', T) instanceof Left)
  })
})

describe('Date', () => {
  it('DateFromISOString', () => {
    const T = DateFromISOString
    const d = new Date(1973, 10, 30)
    const s = d.toISOString()
    assert.ok(fromRight(t.validate(s, T)) instanceof Date)
    assert.strictEqual(fromRight(t.validate(s, T)).getTime(), d.getTime())
    assert.ok(t.validate('foo', T) instanceof Left)
  })

  it('DateFromNumber', () => {
    const T = DateFromNumber
    const millis = new Date(1973, 10, 30).getTime()
    assert.ok(fromRight(t.validate(millis, T)) instanceof Date)
    assert.strictEqual(fromRight(t.validate(millis, T)).getTime(), millis)
    assert.ok(t.validate(NaN, T) instanceof Left)
  })

  it('DateFromUnixTime', () => {
    const T = DateFromUnixTime
    const getSeconds = (d: Date): number => d.getTime() / 1000
    const seconds = getSeconds(new Date(1973, 10, 30))
    assert.ok(fromRight(t.validate(seconds, T)) instanceof Date)
    assert.strictEqual(getSeconds(fromRight(t.validate(seconds, T))), seconds)
    assert.ok(t.validate(NaN, T) instanceof Left)
  })
})

describe('monocle-ts', () => {
  it('AnyStringPrism/StringNumberPrism', () => {
    const P = AnyStringPrism.compose(StringNumberPrism)
    assert.strictEqual(fromSome(P.getOption('10')), 10)
  })

  it('StringJSONPrism', () => {
    const P = StringJSONPrism
    assert.deepEqual(fromSome(P.getOption('{}')), {})
    assert.deepEqual(fromSome(P.getOption('[]')), [])
    assert.deepEqual(fromSome(P.getOption('"s"')), 's')
    assert.strictEqual(fromSome(P.getOption('1')), 1)
    assert.strictEqual(fromSome(P.getOption('true')), true)
    assert.strictEqual(fromSome(P.getOption('null')), null)
    assert.deepEqual(fromSome(P.getOption('{"name":"Giulio"}')), { name: 'Giulio' })
  })

  it('lensesFromProps', () => {
    const Person = t.interface({
      name: t.string,
      age: t.number
    })
    const lenses = lensesFromProps(Person.props)
    assert.strictEqual(lenses.age.get({ name: 'Giulio', age: 43 }), 43)
  })
})

describe('newtype-ts', () => {
  it('fromNewtype', () => {
    type Age = Newtype<'Age', number>
    const T = fromNewtype<Age>(t.number)
    const res: Validation<Age> = t.validate(42, T)
    assert.deepEqual(fromRight(res), 42)
  })
})

describe('JSON', () => {
  it('JSONTypeRT', () => {
    const T = JSONTypeRT
    assert.deepEqual(fromRight(t.validate({}, T)), {})
    assert.deepEqual(fromRight(t.validate([], T)), [])
    assert.deepEqual(fromRight(t.validate('s', T)), 's')
    assert.strictEqual(fromRight(t.validate(1, T)), 1)
    assert.strictEqual(fromRight(t.validate(true, T)), true)
    assert.strictEqual(fromRight(t.validate(null, T)), null)
    assert.deepEqual(fromRight(t.validate({ name: 'Giulio' }, T)), { name: 'Giulio' })
    assert.strictEqual(JSONTypeRT.is([{ a: [true] }]), true)
  })

  it('JSONFromString', () => {
    const T = JSONFromString
    assert.deepEqual(fromRight(t.validate('{}', T)), {})
    assert.deepEqual(fromRight(t.validate('[]', T)), [])
    assert.deepEqual(fromRight(t.validate('"s"', T)), 's')
    assert.strictEqual(fromRight(t.validate('1', T)), 1)
    assert.strictEqual(fromRight(t.validate('true', T)), true)
    assert.strictEqual(fromRight(t.validate('null', T)), null)
    assert.deepEqual(fromRight(t.validate('{"name":"Giulio"}', T)), { name: 'Giulio' })
  })
})
