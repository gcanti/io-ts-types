import * as assert from 'assert'
import * as t from 'io-ts'
import { DateFromISOString } from '../src/Date/DateFromISOString'
import { fallback } from '../src/fallback'
import { assertSuccess, assertFailure } from './helpers'

describe('fallback', () => {
  describe('name', () => {
    it('should assign a default name', () => {
      const T = fallback(DateFromISOString)(new Date(123456))
      assert.strictEqual(T.name, 'fallback(DateFromISOString)')
    })

    it('should accept a name', () => {
      const T = fallback(DateFromISOString)(new Date(123456), 'T')
      assert.strictEqual(T.name, 'T')
    })
  })

  describe('is', () => {
    it('should check a isomorphic value', () => {
      const T = fallback(t.number)(-1)
      assert.strictEqual(T.is('a'), false)
      assert.strictEqual(T.is(1), true)
    })
  })

  describe('decode', () => {
    it('should succeed validating a valid value', () => {
      const T = fallback(t.number)(-1)
      assertSuccess(T.decode(1), 1)
    })

    it('should succeed validating an invalid value', () => {
      const T = fallback(t.number)(-1)
      assertSuccess(T.decode(null), -1)
    })

    it('should handle invalid fallback values', () => {
      // tslint:disable-next-line: deprecation
      const T = fallback(t.refinement(t.number, n => n > 0))(-1)
      assertFailure(T, null, ['Invalid value null supplied to : fallback((number | <function1>))'])
    })
  })

  describe('encode', () => {
    it('should encode a isomorphic value', () => {
      const T = fallback(t.number)(-1)
      assert.strictEqual(T.encode(1), 1)
    })
  })
})
