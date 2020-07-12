import * as assert from 'assert'
import * as t from 'io-ts'
import { withFallback } from '../src'
import { assertSuccess } from './helpers'

describe('withFallback', () => {
  const zero: t.Int = 0 as any
  const one: t.Int = 1 as any

  describe('name', () => {
    it('should assign a default name', () => {
      const T = withFallback(t.Int, zero)
      assert.strictEqual(T.name, 'withFallback(Int)')
    })

    it('should accept a name', () => {
      const T = withFallback(t.Int, zero, 'T')
      assert.strictEqual(T.name, 'T')
    })
  })

  describe('is', () => {
    it('should check a isomorphic value', () => {
      const T = withFallback(t.Int, zero)
      assert.strictEqual(T.is(1), true)
      assert.strictEqual(T.is(1.1), false)
      assert.strictEqual(T.is('a'), false)
    })
  })

  describe('decode', () => {
    it('should decode a isomorphic value', () => {
      const T = withFallback(t.Int, zero)
      assertSuccess(T.decode(1), one)
      assertSuccess(T.decode(1.2), zero)
    })
  })
})
