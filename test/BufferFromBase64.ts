import * as assert from 'assert'
import { assertFailure, assertStrictEqual } from './helpers'
import { BufferFromBase64 } from '../src/BufferFromBase64'

describe.only('BufferFromBase64', () => {
  it('is', () => {
    const T = BufferFromBase64
    assert.strictEqual(T.is(Buffer.from('string')), true)
    assert.strictEqual(T.is(Buffer.alloc(0)), true)
    assert.strictEqual(T.is(null), false)
    assert.strictEqual(T.is(undefined), false)
    assert.strictEqual(T.is('string'), false)
    assert.strictEqual(T.is('SGVsbG8gV29ybGQ='), false)
    assert.strictEqual(T.is(3), false)
    assert.strictEqual(T.is({ a: null }), false)
    assert.strictEqual(T.is([]), false)
  })
  it('decode', () => {
    const T = BufferFromBase64
    assertStrictEqual(T.decode('SGVsbG8gV29ybGQ='), Buffer.from('SGVsbG8gV29ybGQ=', 'base64'))
    assertStrictEqual(T.decode('MQ=='), Buffer.from('MQ==', 'base64'))
    assertStrictEqual(T.decode(Buffer.from('').toString('base64')), Buffer.from('', 'base64'))
    assertFailure(T, 'notBase64', ['Invalid value "notBase64" supplied to : BufferFromBase64'])
    assertFailure(T, 'SGVsbG8gV29ybGQ==', ['Invalid value "SGVsbG8gV29ybGQ==" supplied to : BufferFromBase64'])
    assertFailure(T, 3, ['Invalid value 3 supplied to : BufferFromBase64'])
    assertFailure(T, null, ['Invalid value null supplied to : BufferFromBase64'])
    assertFailure(T, undefined, ['Invalid value undefined supplied to : BufferFromBase64'])
    assertFailure(T, ' ', ['Invalid value " " supplied to : BufferFromBase64'])
    assertFailure(T, { a: null }, ['Invalid value {"a":null} supplied to : BufferFromBase64'])
    assertFailure(T, [], ['Invalid value [] supplied to : BufferFromBase64'])
    assertFailure(T, Buffer.from('s'), ['Invalid value {"type":"Buffer","data":[115]} supplied to : BufferFromBase64'])
  })
  it('encode', () => {
    const T = BufferFromBase64
    assert.strictEqual(T.encode(Buffer.from('')), '')
    assert.strictEqual(T.encode(Buffer.from('string')), 'c3RyaW5n')
    assert.strictEqual(T.encode(Buffer.from('1')), 'MQ==')
  })
})
