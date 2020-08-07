import { setFromArray } from '../src'
import * as t from 'io-ts'
import * as assert from 'assert'
import { assertFailure, assertSuccess } from './helpers'
import { ordNumber } from 'fp-ts/Ord'

describe('setFromArray', () => {
  it('name', () => {
    const T = setFromArray(t.number, ordNumber, 'T')
    assert.strictEqual(T.name, 'T')
  })

  it('is', () => {
    const T = setFromArray(t.number, ordNumber)
    assert.deepStrictEqual(T.is(null), false)
    assert.deepStrictEqual(T.is(new Set()), true)
    assert.deepStrictEqual(T.is(new Set([])), true)
    assert.deepStrictEqual(T.is(new Set([1])), true)
    assert.deepStrictEqual(T.is(new Set([1, 1])), true)
    assert.deepStrictEqual(T.is(new Set([1, 2])), true)
    assert.deepStrictEqual(T.is(new Set([1, '1'])), false)
  })

  it('decode', () => {
    const T = setFromArray(t.number, ordNumber)
    assertSuccess(T.decode([]), new Set())
    assertSuccess(T.decode([1]), new Set([1]))
    assertSuccess(T.decode([1, 2, 3]), new Set([1, 2, 3]))
    assertFailure(T, [1, 1], ['Invalid value [1,1] supplied to : Set<number>'])
    assertFailure(T, null, ['Invalid value null supplied to : Set<number>'])
    assertFailure(T, [1, 'a'], ['Invalid value "a" supplied to : Set<number>/1: number'])
  })

  it('encode', () => {
    const T = setFromArray(t.number, ordNumber)
    assert.deepStrictEqual(T.encode(new Set([1, 2, 3])), [1, 2, 3])
    assert.deepStrictEqual(T.encode(new Set([1])), [1])
    assert.deepStrictEqual(T.encode(new Set([])), [])
    assert.deepStrictEqual(T.encode(new Set()), [])
  })
})
