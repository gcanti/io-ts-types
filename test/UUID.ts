import * as assert from 'assert'
import { UUID } from '../src/UUID'
import { assertSuccess, assertFailure } from './helpers'

describe('NonEmptyString', () => {
  describe('is', () => {
    it('should check a isomorphic value', () => {
      const T = UUID
      assert.strictEqual(T.is('not a uuid'), false)
      assert.strictEqual(T.is('00000000-0000-0000-0000-000000000000'), true)
    })
  })

  describe('decode', () => {
    it('should succeed validating a valid value', () => {
      const T = UUID
      assertSuccess(T.decode('00000000-0000-0000-0000-000000000000'), '00000000-0000-0000-0000-000000000000' as UUID)
    })

    it('should fail validation an invalid value', () => {
      const T = UUID
      assertFailure(T, null, ['Invalid value null supplied to : UUID'])
      assertFailure(T, '', ['Invalid value "" supplied to : UUID'])
    })
  })

  describe('encode', () => {
    it('should encode a isomorphic value', () => {
      const T = UUID
      assert.strictEqual(
        T.encode('00000000-0000-0000-0000-000000000000' as UUID),
        '00000000-0000-0000-0000-000000000000'
      )
    })
  })
})
