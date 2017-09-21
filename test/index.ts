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
  lensesFromInterface,
  lensesFromTuple,
  prismsFromUnion
} from '../src'
import * as t from 'io-ts'
import { None, Some, none, some } from 'fp-ts/lib/Option'
import { Left, Right } from 'fp-ts/lib/Either'
import { fromSome, fromRight } from './helpers'

describe('fp-ts', () => {
  it('createOptionFromNullable', () => {
    const T = createOptionFromNullable(t.number)
    assert.ok(fromRight(t.validate(null, T)) instanceof None)
    assert.ok(fromRight(t.validate(1, T)) instanceof Some)
  })

  it('createOptionFromJSON', () => {
    const T = createOptionFromJSON(t.number)
    assert.ok(fromRight(t.validate({ type: 'Option', value: null }, T)) instanceof None)
    assert.ok(fromRight(t.validate({ type: 'Option', value: 1 }, T)) instanceof Some)
  })

  it('createEitherFromJSON', () => {
    const T = createEitherFromJSON(t.string, t.number)
    assert.ok(fromRight(t.validate({ type: 'Left', value: 's' }, T)) instanceof Left)
    assert.ok(fromRight(t.validate({ type: 'Right', value: 1 }, T)) instanceof Right)
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

  it('lensesFromInterface', () => {
    const Person = t.interface({
      name: t.string,
      age: t.number
    })
    const lenses = lensesFromInterface(Person)
    assert.strictEqual(lenses.age.get({ name: 'Giulio', age: 43 }), 43)
  })

  it('lensesFromTuple', () => {
    const Point = t.tuple([t.number, t.number])
    const pointLenses = lensesFromTuple(Point)
    assert.strictEqual(pointLenses.L1.get([100, 200]), 200)
    assert.deepEqual(pointLenses.L0.set(50)([100, 200]), [50, 200])
  })

  it('prismsFromUnion', () => {
    const RuntimeUnion = t.union([t.string, t.number])
    const unionPrisms = prismsFromUnion(RuntimeUnion)
    assert.deepEqual(unionPrisms.P0.getOption('a'), some('a'))
    assert.deepEqual(unionPrisms.P0.getOption(1), none)
    assert.deepEqual(unionPrisms.P1.getOption('a'), none)
    assert.deepEqual(unionPrisms.P1.getOption(1), some(1))
  })
})

describe('JSON', () => {
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
