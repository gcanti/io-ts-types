import * as assert from 'assert'
import * as t from 'io-ts'
import { withLazyFallback } from '../src/withLazyFallback'
import { assertSuccess } from './helpers'

describe('withLazyFallback', () => {
  const zero: t.Int = 0 as any
  const one: t.Int = 1 as any

  const zeroFn: () => t.Int = () => 0 as any

  describe('name', () => {
    it('should assign a default name', () => {
      const T = withLazyFallback(t.Int, zeroFn)
      assert.strictEqual(T.name, 'withLazyFallback(Int)')
    })

    it('should accept a name', () => {
      const T = withLazyFallback(t.Int, zeroFn, 'T')
      assert.strictEqual(T.name, 'T')
    })
  })

  describe('is', () => {
    it('should check a isomorphic value', () => {
      const T = withLazyFallback(t.Int, zeroFn)
      assert.strictEqual(T.is(1), true)
      assert.strictEqual(T.is(1.1), false)
      assert.strictEqual(T.is('a'), false)
    })
  })

  describe('decode', () => {
    it('should decode a isomorphic value', () => {
      const T = withLazyFallback(t.Int, zeroFn)
      assertSuccess(T.decode(1), one)
      assertSuccess(T.decode(1.2), zero)
    })
  })
})
