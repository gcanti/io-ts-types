import * as assert from 'assert'
import { NonEmptyString } from '../src'
import { assertSuccess, assertFailure } from './helpers'

describe('NonEmptyString', () => {
  describe('is', () => {
    it('should check a isomorphic value', () => {
      const T = NonEmptyString
      assert.strictEqual(T.is(''), false)
      assert.strictEqual(T.is('a'), true)
    })
  })

  describe('decode', () => {
    it('should succeed validating a valid value', () => {
      const T = NonEmptyString
      assertSuccess(T.decode('a'), 'a' as NonEmptyString)
    })

    it('should fail validation an invalid value', () => {
      const T = NonEmptyString
      assertFailure(T, null, ['Invalid value null supplied to : NonEmptyString'])
      assertFailure(T, '', ['Invalid value "" supplied to : NonEmptyString'])
    })
  })

  describe('encode', () => {
    it('should encode a isomorphic value', () => {
      const T = NonEmptyString
      assert.strictEqual(T.encode('a' as NonEmptyString), 'a')
    })
  })
})
