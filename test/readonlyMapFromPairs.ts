import * as assert from 'assert'
import { pipe } from 'fp-ts/function'
import { Ord, ordString, contramap } from 'fp-ts/Ord'
import * as t from 'io-ts'
import { assertSuccess, assertFailure } from './helpers'

import { readonlyMapFromPairs } from '../src/readonlyMapFromPairs'

describe('readonlyMapFromPairs', () => {
  const K = t.type({ a: t.string })
  const KO: Ord<t.TypeOf<typeof K>> = pipe(
    ordString,
    contramap(m => m.a)
  )
  const C = t.type({ b: t.number })
  const T = readonlyMapFromPairs(K, KO, C)

  it('name', () => {
    const T = readonlyMapFromPairs(K, KO, C, 'T')
    assert.strictEqual(T.name, 'T')
  })

  it('decode', () => {
    assertSuccess(T.decode([]), new Map())
    assertSuccess(
      T.decode([[{ a: '1' }, { b: 1 }], [{ a: '2' }, { b: 2 }]]),
      new Map([[{ a: '1' }, { b: 1 }], [{ a: '2' }, { b: 2 }]])
    )
    assertFailure(
      T,
      [[{ a: '1' }, { b: 1 }], [{ a: '1' }, { b: 2 }]],
      [
        'Invalid value [[{"a":"1"},{"b":1}],[{"a":"1"},{"b":2}]] supplied to : ReadonlyMap<{ a: string }, { b: number }>'
      ]
    )
  })
})
