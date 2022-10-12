import * as assert from 'assert'
import { pipe } from 'fp-ts/function'
import { Ord, ordString, contramap } from 'fp-ts/Ord'
import * as t from 'io-ts'
import { assertSuccess, assertFailure } from './helpers'

import { mapFromEntries } from '../src/mapFromEntries'

describe('mapFromEntries', () => {
  const K = t.type({ a: t.string })
  const KO: Ord<t.TypeOf<typeof K>> = pipe(
    ordString,
    contramap(m => m.a)
  )
  const C = t.type({ b: t.number })
  const T = mapFromEntries(K, KO, C)

  it('name', () => {
    const T = mapFromEntries(K, KO, C, 'T')
    assert.strictEqual(T.name, 'T')
  })

  it('is', () => {
    assert.strictEqual(T.is(new Map()), true)
    assert.strictEqual(T.is(new Map([[{ a: 'a' }, { b: 1 }]])), true)
    assert.strictEqual(T.is(null), false)
    assert.strictEqual(T.is(undefined), false)
    assert.strictEqual(T.is({}), false)
    assert.strictEqual(T.is([]), false)
    assert.strictEqual(T.is(new Map([['a', 'b']])), false)
    assert.strictEqual(T.is(new Map([['a', { b: 1 }]])), false)
    assert.strictEqual(T.is(new Map([[{ a: 'a' }, 1]])), false)
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
      ['Invalid value [[{"a":"1"},{"b":1}],[{"a":"1"},{"b":2}]] supplied to : Map<{ a: string }, { b: number }>']
    )
  })

  it('encode', () => {
    assert.deepStrictEqual(T.encode(new Map()), [])
    assert.deepStrictEqual(T.encode(new Map([[{ a: '1' }, { b: 1 }], [{ a: '2' }, { b: 2 }]])), [
      [{ a: '1' }, { b: 1 }],
      [{ a: '2' }, { b: 2 }]
    ])
  })
})
