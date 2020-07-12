import * as assert from 'assert'
import * as t from 'io-ts'
import { getLenses } from '../src'
import { Lens } from 'monocle-ts'

describe('getLenses', () => {
  it('type', () => {
    const T = t.type({
      name: t.string,
      age: t.number
    })
    const lenses = getLenses(T)
    assert.strictEqual(lenses.name instanceof Lens, true)
    assert.strictEqual(lenses.age instanceof Lens, true)
  })

  it('strict', () => {
    const T = t.strict({
      name: t.string,
      age: t.number
    })
    const lenses = getLenses(T)
    assert.strictEqual(lenses.name instanceof Lens, true)
    assert.strictEqual(lenses.age instanceof Lens, true)
  })
})
