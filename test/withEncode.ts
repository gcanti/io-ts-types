import * as t from 'io-ts'
import * as assert from 'assert'
import { withEncode } from '../src'
import { assertSuccess, assertFailure } from './helpers'

describe('withEncode', () => {
  it('is', () => {
    const T = withEncode(t.number, String)
    assert.strictEqual(T.is(5), true)
    assert.strictEqual(T.is(null), false)
  })
  it('decode', () => {
    const T = withEncode(t.number, String, 'MyCodec')
    assertSuccess(T.decode(0), 0)
    assertSuccess(T.decode(10), 10)
    assertSuccess(T.decode(-1), -1)
    assertSuccess(T.decode(11), 11)
    assertFailure(T, '', ['Invalid value "" supplied to : MyCodec'])
    assertFailure(T, 'a', ['Invalid value "a" supplied to : MyCodec'])
  })
  it('encode', () => {
    const T = withEncode(t.number, String)
    assert.strictEqual(T.encode(5), '5')
  })
})
