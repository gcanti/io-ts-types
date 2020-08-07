import { nonEmptyArray } from '../src'
import * as t from 'io-ts'
import { cons } from 'fp-ts/NonEmptyArray'
import * as assert from 'assert'
import { assertFailure, assertSuccess } from './helpers'

describe('nonEmptyArray', () => {
  it('name', () => {
    const T = nonEmptyArray(t.number, 'T')
    assert.strictEqual(T.name, 'T')
  })

  it('is', () => {
    const T = nonEmptyArray(t.number)
    assert.strictEqual(T.is(cons(1, [2, 3])), true)
    assert.strictEqual(T.is(null), false)
    assert.strictEqual(T.is(cons('a', ['b', 'c'])), false)
  })

  it('decode', () => {
    const T = nonEmptyArray(t.number)
    assertSuccess(T.decode([1]), cons(1, []))
    assertSuccess(T.decode([1, 2, 3]), cons(1, [2, 3]))
    assertFailure(T, null, ['Invalid value null supplied to : NonEmptyArray<number>'])
    assertFailure(T, [], ['Invalid value [] supplied to : NonEmptyArray<number>'])
  })

  it('encode', () => {
    const T = nonEmptyArray(t.number)
    assert.deepStrictEqual(T.encode(cons(1, [2, 3])), [1, 2, 3])
    assert.deepStrictEqual(T.encode(cons(1, [])), [1])
  })
})
