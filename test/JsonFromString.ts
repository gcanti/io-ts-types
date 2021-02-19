import * as assert from 'assert'
import { JsonFromString, JsonArray } from '../src'
import { assertFailure, assertSuccess } from './helpers'
import * as t from 'io-ts'

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

  it('#156', () => {
    const C = JsonFromString.pipe(
      t.type({
        a: JsonArray
      })
    )
    assertSuccess(C.decode('{"a":[]}'), { a: [] })
    assertFailure(C, '{"a":1}', ['Invalid value 1 supplied to : pipe(JsonFromString, { a: JsonArray })/a: JsonArray'])
  })
})
