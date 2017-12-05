import * as assert from 'assert'
import {
  createOptionFromNullable,
  createOptionFromJSON,
  createEitherFromJSON,
  createRange,
  NumberFromString,
  IntegerFromString,
  DateFromISOString,
  AnyStringPrism,
  StringNumberPrism,
  StringJSONPrism,
  DateFromNumber,
  JSONFromString,
  JSONTypeRT,
  lensesFromProps,
  fromIso
} from '../src'
import * as t from 'io-ts'
import * as m from 'monocle-ts'
import { None, Some, some, none } from 'fp-ts/lib/Option'
import { Left, Right, left, right } from 'fp-ts/lib/Either'
import { fromSome, fromRight } from './helpers'

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

  it('createEitherFromJSON', () => {
    const T = createEitherFromJSON(t.string, t.number)
    assert.ok(fromRight(t.validate({ type: 'Left', value: 's' }, T)) instanceof Left)
    assert.ok(fromRight(t.validate({ type: 'Right', value: 1 }, T)) instanceof Right)
    assert.deepEqual(T.serialize(left('a')), { type: 'Left', value: 'a' })
    assert.deepEqual(T.serialize(right(1)), { type: 'Right', value: 1 })
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
    const n = new Date(1973, 10, 30).getTime()
    assert.ok(fromRight(t.validate(n, T)) instanceof Date)
    assert.strictEqual(fromRight(t.validate(n, T)).getTime(), n)
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

  describe('ISOType', () => {
    type A = {
      a: string
    }
    const a: A = { a: 'x' }
    type B = {
      b: string
    }
    const b: B = { b: 'x' }

    const ABiso = new m.Iso<A, B>(n => ({ b: n.a }), n => ({ a: n.b }))
    const ABType = fromIso(
      't',
      ABiso,
      (n: any): n is B => typeof n === 'object' && n.hasOwnProperty('b') && typeof n['b'] === 'string'
    )

    it('validate', () => {
      assert.deepEqual(fromRight(t.validate(a, ABType)), b)
    })

    it('serialize', () => {
      assert.deepEqual(ABType.serialize(b), a)
    })
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
