import * as assert from 'assert'
import { JsonFromString } from '../src'
import { assertFailure, assertSuccess } from './helpers'

describe('JSONFromString', () => {
  it('is', () => {
    const T = JsonFromString
    assert.deepStrictEqual(T.is(null), true)
    assert.deepStrictEqual(T.is('a'), true)
    assert.deepStrictEqual(T.is(1), true)
    assert.deepStrictEqual(T.is(true), true)
    assert.deepStrictEqual(T.is(false), true)
    assert.deepStrictEqual(T.is([]), true)
    assert.deepStrictEqual(T.is([1]), true)
    assert.deepStrictEqual(T.is({}), true)
    assert.deepStrictEqual(T.is({ a: 1 }), true)
    assert.deepStrictEqual(T.is({ a: Date }), false)
  })

  it('decode', () => {
    const T = JsonFromString
    assertSuccess(T.decode('null'), null)
    assertSuccess(T.decode('1'), 1)
    assertSuccess(T.decode('"a"'), 'a')
    assertSuccess(T.decode('true'), true)
    assertSuccess(T.decode('false'), false)
    assertSuccess(T.decode('[]'), [])
    assertSuccess(T.decode('{}'), {})
    assertFailure(T, '{', ['Invalid value "{" supplied to : JsonFromString'])
    assertFailure(T, '{"a":undefined}', ['Invalid value "{\\"a\\":undefined}" supplied to : JsonFromString'])
  })

  it('encode', () => {
    const T = JsonFromString
    assert.deepEqual(T.encode({}), '{}')
  })
})
