import * as assert from 'assert'
import { JSONFromString } from '../src'
import { assertFailure, assertSuccess } from './helpers'

describe('JSONFromString', () => {
  it('is', () => {
    assert.deepStrictEqual(JSONFromString.is(null), true)
    assert.deepStrictEqual(JSONFromString.is('a'), true)
    assert.deepStrictEqual(JSONFromString.is(1), true)
    assert.deepStrictEqual(JSONFromString.is(true), true)
    assert.deepStrictEqual(JSONFromString.is(false), true)
    assert.deepStrictEqual(JSONFromString.is([]), true)
    assert.deepStrictEqual(JSONFromString.is([1]), true)
    assert.deepStrictEqual(JSONFromString.is({}), true)
    assert.deepStrictEqual(JSONFromString.is({ a: 1 }), true)
    assert.deepStrictEqual(JSONFromString.is({ a: Date }), false)
  })

  it('decode', () => {
    const T = JSONFromString
    assertSuccess(T.decode('null'), null)
    assertSuccess(T.decode('1'), 1)
    assertSuccess(T.decode('"a"'), 'a')
    assertSuccess(T.decode('true'), true)
    assertSuccess(T.decode('false'), false)
    assertSuccess(T.decode('[]'), [])
    assertSuccess(T.decode('{}'), {})
    assertFailure(T, '{', ['Invalid value "{" supplied to : JSONFromString'])
    assertFailure(T, '{"a":undefined}', ['Invalid value "{\\"a\\":undefined}" supplied to : JSONFromString'])
  })

  it('encode', () => {
    const T = JSONFromString
    assert.deepEqual(T.encode({}), '{}')
  })
})
