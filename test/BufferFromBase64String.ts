import * as assert from 'assert'
import { BufferFromBase64String } from '../src'
import { assertFailure, assertSuccess } from './helpers'

describe('BufferFromBase64String', () => {
  const T = BufferFromBase64String
  it('is', () => {
    assert.strictEqual(T.is(Buffer.alloc(1)), true)
    assert.strictEqual(T.is(null), false)
  })
  it('decode', () => {
    assertSuccess(T.decode(''), Buffer.alloc(0))
    assertSuccess(T.decode('aGVsbG8='), Buffer.from('aGVsbG8=', 'base64'))
    assertFailure(T, 'aGV     sbG8=', ['Invalid value "aGV     sbG8=" supplied to : BufferFromBase64String'])
    assertFailure(T, '!@#$%^', ['Invalid value "!@#$%^" supplied to : BufferFromBase64String'])
  })
  it('encode', () => {
    assert.strictEqual(T.encode(Buffer.alloc(0)), '')
    assert.strictEqual(T.encode(Buffer.from('aGVsbG8=', 'base64')), 'aGVsbG8=')
  })
})
