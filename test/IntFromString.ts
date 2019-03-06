import * as assert from 'assert'
import * as t from 'io-ts'
import { IntFromString } from '../src/IntFromString'
import { assertSuccess, assertFailure } from './helpers'

describe('fallback', () => {
  describe('is', () => {
    it('should check a isomorphic value', () => {
      const T = IntFromString
      assert.strictEqual(T.is('a'), false)
      assert.strictEqual(T.is(1), true)
      assert.strictEqual(T.is(1.1), false)
    })
  })

  describe('decode', () => {
    it('should succeed validating a valid value', () => {
      const T = IntFromString
      assertSuccess(T.decode('1'), 1 as t.Int)
    })

    it('should fail validation an invalid value', () => {
      const T = IntFromString
      assertFailure(T, null, ['Invalid value null supplied to : IntFromString'])
      assertFailure(T, '1.1', ['Invalid value "1.1" supplied to : IntFromString'])
      assertFailure(T, '1a', ['Invalid value "1a" supplied to : IntFromString'])
      assertFailure(T, '2a', ['Invalid value "2a" supplied to : IntFromString'])
      assertFailure(T, '2.a', ['Invalid value "2.a" supplied to : IntFromString'])
    })
  })

  describe('encode', () => {
    it('should encode a isomorphic value', () => {
      const T = IntFromString
      assert.strictEqual(T.encode(1 as t.Int), '1')
    })
  })
})
