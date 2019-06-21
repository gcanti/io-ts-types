import * as assert from 'assert'
import * as t from 'io-ts'
import { toPrism } from '../src/toPrism'
import { Prism } from 'monocle-ts'

describe('toPrism', () => {
  it('should return a Prism', () => {
    const prism = toPrism(t.string)
    assert.strictEqual(prism instanceof Prism, true)
  })
})
