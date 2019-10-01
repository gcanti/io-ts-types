import * as assert from 'assert'
import * as t from 'io-ts'
import { getEq } from '../src/getEq'

describe('getLenses', () => {
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
})
