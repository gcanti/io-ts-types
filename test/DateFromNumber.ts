import * as assert from 'assert'
import { DateFromNumber } from '../src'
import { assertSuccess, assertFailure } from './helpers'
import { either } from 'fp-ts/Either'

const d = new Date(1973, 10, 30)
const n = d.getTime()

describe('DateFromNumber', () => {
  it('is', () => {
    const T = DateFromNumber
    assert.strictEqual(T.is(d), true)
    assert.strictEqual(T.is(0), false)
  })

  it('decode', () => {
    const T = DateFromNumber
    assertSuccess(T.decode(n), d)
    assertSuccess(either.map(T.decode(n), d => d.getTime()), n)
    assertFailure(T, NaN, ['Invalid value NaN supplied to : DateFromNumber'])
    assertFailure(T, '', ['Invalid value "" supplied to : DateFromNumber'])
  })

  it('encode', () => {
    const T = DateFromNumber
    assert.strictEqual(T.encode(d), n)
  })
})
