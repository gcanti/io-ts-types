import * as assert from 'assert'
import { left, right } from 'fp-ts/lib/Either'
import * as t from 'io-ts'
import { either } from '../src/either'
import { assertFailure, assertSuccess } from './helpers'

describe('either', () => {
  it('is', () => {
    const T = either(t.string, t.number)
    assert.strictEqual(T.is(right(1)), true)
    assert.strictEqual(T.is(right('foo')), false)
    assert.strictEqual(T.is(left(1)), false)
    assert.strictEqual(T.is(left('foo')), true)
  })

  it('decode', () => {
    const T = either(t.string, t.number)
    assertSuccess(T.decode({ _tag: 'Left', left: 's' }), left<string, number>('s'))
    assertSuccess(T.decode({ _tag: 'Right', right: 1 }), right<string, number>(1))
    assertFailure(T, null, ['Invalid value null supplied to : Either<string, number>'])
  })

  it('encode', () => {
    const T = either(t.string, t.number)
    assert.deepStrictEqual(T.encode(left('a')), { _tag: 'Left', left: 'a' })
    assert.deepStrictEqual(T.encode(right(1)), { _tag: 'Right', right: 1 })
  })
})
