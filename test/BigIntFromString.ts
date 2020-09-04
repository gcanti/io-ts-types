import * as assert from 'assert'
import { BigIntFromString } from '../src'
import { assertSuccess, assertFailure } from './helpers'

describe('BigIntFromString', () => {
  it('is', () => {
    const T = BigIntFromString
    assert.strictEqual(T.is(BigInt(5)), true)
    assert.strictEqual(T.is(null), false)
  })
  it('decode', () => {
    const T = BigIntFromString
    assertSuccess(T.decode('0'), BigInt(0))
    assertSuccess(T.decode('10'), BigInt(10))
    assertSuccess(T.decode('-1'), BigInt(-1))
    assertSuccess(T.decode('11'), BigInt(11))
    assertFailure(T, '5.5', ['Invalid value "5.5" supplied to : BigIntFromString'])
    assertFailure(T, '-5.5', ['Invalid value "-5.5" supplied to : BigIntFromString'])
    assertFailure(T, '', ['Invalid value "" supplied to : BigIntFromString'])
    assertFailure(T, ' ', ['Invalid value " " supplied to : BigIntFromString'])
    assertFailure(T, 'a', ['Invalid value "a" supplied to : BigIntFromString'])
    assertFailure(T, 'a5', ['Invalid value "a5" supplied to : BigIntFromString'])
  })
  it('encode', () => {
    const T = BigIntFromString
    assert.strictEqual(T.encode(BigInt(5)), '5')
  })
})
