import * as assert from 'assert'
import { DateFromISOString } from '../src'
import { assertFailure, assertSuccess } from './helpers'

const d = new Date(1973, 10, 30)
const s = d.toISOString()

describe('DateFromISOString', () => {
  it('is', () => {
    const T = DateFromISOString
    assert.strictEqual(T.is(d), true)
  })

  it('decode', () => {
    const T = DateFromISOString
    assertSuccess(T.decode(s), d)
    assertFailure(T, null, ['Invalid value null supplied to : DateFromISOString'])
    assertFailure(T, 'foo', ['Invalid value "foo" supplied to : DateFromISOString'])
    assert.deepStrictEqual(T.decode(d)._tag, 'Left')
  })

  it('encode', () => {
    const T = DateFromISOString
    assert.strictEqual(T.encode(d), s)
  })
})
