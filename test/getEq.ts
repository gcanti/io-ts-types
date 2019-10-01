import * as assert from 'assert'
import * as t from 'io-ts'
import { getEq } from '../src/getEq'

describe('getEq', () => {
  it('type', () => {
    const Person = t.type({
      name: t.string,
      age: t.number,
      tags: t.array(t.string)
    })
    const eqPerson = getEq(Person)
    assert.strictEqual(
      eqPerson.equals({ name: 'John', age: 30, tags: ['a'] }, { name: 'John', age: 30, tags: ['a'] }),
      true
    )
    assert.strictEqual(
      eqPerson.equals({ name: 'John', age: 30, tags: ['a'] }, { name: 'John', age: 30, tags: ['a', 'b'] }),
      false
    )
  })

  it('strict', () => {
    const Person = t.strict({
      name: t.string,
      age: t.number,
      tags: t.array(t.string)
    })
    const eqPerson = getEq(Person)
    assert.strictEqual(
      eqPerson.equals({ name: 'John', age: 30, tags: ['a'] }, { name: 'John', age: 30, tags: ['a'] }),
      true
    )
    assert.strictEqual(
      eqPerson.equals({ name: 'John', age: 30, tags: ['a'] }, { name: 'John', age: 30, tags: ['a', 'b'] }),
      false
    )
  })

  it('record', () => {
    const R = t.record(t.string, t.boolean)
    const eqR = getEq(R)
    assert.strictEqual(eqR.equals({ a: true }, { a: true }), true)
    assert.strictEqual(eqR.equals({ a: false }, { a: true }), false)
  })

  it('union', () => {
    const U = t.union([t.string, t.type({ name: t.string })])
    const eqU = getEq(U)
    assert.strictEqual(eqU.equals({ name: 'John' }, { name: 'John' }), true)
    assert.strictEqual(eqU.equals({ name: 'John' }, 'John'), false)
  })

  it('literal', () => {
    const L = t.literal(3)
    const eqL = getEq(L)
    assert.strictEqual(eqL.equals(3, 3), true)
  })

  it('tuple', () => {
    const T = t.tuple([t.number, t.string])
    const eqT = getEq(T)
    assert.strictEqual(eqT.equals([1, '2'], [1, '2']), true)
    assert.strictEqual(eqT.equals([1, '2'], [1, '3']), false)
  })

  it('intersection', () => {
    const I = t.intersection([t.type({ age: t.number }), t.type({ name: t.string })])
    const eqI = getEq(I)
    assert.strictEqual(eqI.equals({ name: 'John', age: 30 }, { name: 'John', age: 30 }), true)
    assert.strictEqual(eqI.equals({ name: 'John', age: 30 }, { name: 'John', age: 31 }), false)
  })

  it('unknown', () => {
    const eqU = getEq(t.unknown)
    assert.strictEqual(eqU.equals({ name: 'John', age: 30 }, { name: 'John', age: 30 }), false)
    assert.strictEqual(eqU.equals('a', 'a'), true)
  })

  it('branded', () => {
    const eqInt = getEq(t.Int)
    const one: t.TypeOf<typeof t.Int> = 1 as any
    const two: t.TypeOf<typeof t.Int> = 2 as any
    assert.strictEqual(eqInt.equals(one, one), true)
    assert.strictEqual(eqInt.equals(one, two), false)
  })
})
