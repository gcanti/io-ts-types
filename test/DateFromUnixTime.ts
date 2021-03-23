import * as assert from 'assert'
import { DateFromUnixTime } from '../src'
import { assertSuccess, assertFailure } from './helpers'
import { either } from 'fp-ts/lib/Either'

const d = new Date(1973, 10, 30, 12, 12, 12, 12)
const seconds = Math.floor(d.getTime() / 1000)

describe('DateFromUnixTime', () => {
  it('is', () => {
    const T = DateFromUnixTime
    assert.strictEqual(T.is(d), true)
    assert.strictEqual(T.is(0), false)
  })

  it('decode', () => {
    const T = DateFromUnixTime
    assertSuccess(T.decode(seconds), new Date(seconds * 1000))
    assertSuccess(either.map(T.decode(seconds), d => d.getTime()), seconds * 1000)
    assertFailure(T, NaN, ['Invalid value NaN supplied to : DateFromUnixTime'])
    assertFailure(T, '', ['Invalid value "" supplied to : DateFromUnixTime'])
    assertFailure(T, 1.2345678901234568e79, ['Invalid value 1.2345678901234568e+79 supplied to : DateFromUnixTime'])
  })

  it('encode', () => {
    const T = DateFromUnixTime
    assert.strictEqual(T.encode(d), seconds)
  })
})
