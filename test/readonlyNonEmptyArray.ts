import * as assert from 'assert'
import { cons } from 'fp-ts/lib/NonEmptyArray'
import * as t from 'io-ts'
import { readonlyNonEmptyArray } from '../src/readonlyNonEmptyArray'
import { assertFailure, assertSuccess } from './helpers'

describe('readonlyNonEmptyArray', () => {
  it('name', () => {
    const T = readonlyNonEmptyArray(t.number, 'T')
    assert.strictEqual(T.name, 'T')
  })

  it('decode', () => {
    const T = readonlyNonEmptyArray(t.number)
    assertSuccess(T.decode([1]), cons(1, []))
    assertSuccess(T.decode([1, 2, 3]), cons(1, [2, 3]))
    assertFailure(T, null, ['Invalid value null supplied to : ReadonlyNonEmptyArray<number>'])
    assertFailure(T, [], ['Invalid value [] supplied to : ReadonlyNonEmptyArray<number>'])
  })
})
