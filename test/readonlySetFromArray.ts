import { readonlySetFromArray } from '../src'
import * as t from 'io-ts'
import * as assert from 'assert'
import { assertFailure, assertSuccess } from './helpers'
import { ordNumber } from 'fp-ts/lib/Ord'

describe('readonlySetFromArray', () => {
  it('name', () => {
    const T = readonlySetFromArray(t.number, ordNumber, 'T')
    assert.strictEqual(T.name, 'T')
  })

  it('decode', () => {
    const T = readonlySetFromArray(t.number, ordNumber)
    assertSuccess(T.decode([]), new Set())
    assertSuccess(T.decode([1]), new Set([1]))
    assertSuccess(T.decode([1, 2, 3]), new Set([1, 2, 3]))
    assertFailure(T, [1, 1], ['Invalid value [1,1] supplied to : ReadonlySet<number>'])
    assertFailure(T, null, ['Invalid value null supplied to : ReadonlySet<number>'])
    assertFailure(T, [1, 'a'], ['Invalid value "a" supplied to : ReadonlySet<number>/1: number'])
  })
})
