import * as assert from 'assert'
import * as t from 'io-ts'
import { withDefault } from '../src/withDefault'
import { assertSuccess, assertFailure } from './helpers'

describe('withDefault', () => {
  const zero: t.Int = 0 as any
  const one: t.Int = 1 as any

  describe('name', () => {
    it('should assign a default name', () => {
      const T = withDefault(t.Int, one)
      assert.strictEqual(T.name, 'Int = 1')
    })

    it('should accept a name', () => {
      const T = withDefault(t.Int, one, 'T(1)')
      assert.strictEqual(T.name, 'T(1)')
    })
  })

  describe('is', () => {
    it('should check a isomorphic value', () => {
      const T = withDefault(t.Int, one)
      assert.strictEqual(T.is(1), true)
      assert.strictEqual(T.is(0), true)
      assert.strictEqual(T.is(null), false)
      assert.strictEqual(T.is(undefined), false)
      assert.strictEqual(T.is('a'), false)
    })
  })

  describe('decode', () => {
    it('should decode a isomorphic value', () => {
      const T = withDefault(t.Int, one)
      assertSuccess(T.decode(1), one)
      assertSuccess(T.decode(0), zero)
    })

    it('should decode to default value on null', () => {
      const T = withDefault(t.Int, one)
      assertSuccess(T.decode(null), one)
      assertSuccess(T.decode(undefined), one)
    })

    it('should fail on invalid input', () => {
      const T = withDefault(t.Int, zero)
      assertFailure(T, 'a', ['Invalid value "a" supplied to : Int'])
    })
  })
})
