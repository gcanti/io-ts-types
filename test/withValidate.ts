import * as assert from 'assert'
import * as t from 'io-ts'
import { withValidate } from '../src/withValidate'
import { assertSuccess, assertFailure } from './helpers'

describe('withValidate', () => {
  it('should return a clone of a codec with the given validate function', () => {
    const T = withValidate(t.number, (u, c) => t.number.validate(u, c).map(n => n * 2))
    assertSuccess(T.decode(1), 2)
    assertFailure(T, null, ['Invalid value null supplied to : number'])
  })

  it('should accept a name', () => {
    const T = withValidate(t.number, (u, c) => t.number.validate(u, c).map(n => n * 2), 'T')
    assert.strictEqual(T.name, 'T')
  })
})
