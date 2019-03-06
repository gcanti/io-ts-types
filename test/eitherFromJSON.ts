import * as assert from 'assert'
import { left, right } from 'fp-ts/lib/Either'
import * as t from 'io-ts'
import { eitherFromJSON } from '../src/eitherFromJSON'
import { assertFailure, assertSuccess } from './helpers'
import { NumberFromString } from '../src/number/NumberFromString'

describe('eitherFromJSON', () => {
  it('is', () => {
    const T = eitherFromJSON(t.string, t.number)
    assert.strictEqual(T.is(right(1)), true)
    assert.strictEqual(T.is(right('foo')), false)
    assert.strictEqual(T.is(left(1)), false)
    assert.strictEqual(T.is(left('foo')), true)
  })

  it('decode', () => {
    const T1 = eitherFromJSON(t.string, t.number)
    assertSuccess(T1.decode({ _tag: 'Left', value: 's' }), left<string, number>('s'))
    assertSuccess(T1.decode({ _tag: 'Right', value: 1 }), right<string, number>(1))
    assertFailure(T1, null, ['Invalid value null supplied to : Either<string, number>'])
    assertFailure(T1, {}, ['Invalid value {} supplied to : Either<string, number>'])
    assertFailure(T1, { _tag: 'Left', value: true }, [
      'Invalid value true supplied to : Either<string, number>/value: string'
    ])
    assertFailure(T1, { _tag: 'Right', value: 'a' }, [
      'Invalid value "a" supplied to : Either<string, number>/value: number'
    ])

    const T2 = eitherFromJSON(t.string, NumberFromString)
    assertSuccess(T2.decode({ _tag: 'Right', value: '1' }), right<string, number>(1))
  })

  it('encode', () => {
    const T1 = eitherFromJSON(t.string, t.number)
    assert.deepStrictEqual(T1.encode(left('a')), { _tag: 'Left', value: 'a' })
    assert.deepStrictEqual(T1.encode(right(1)), { _tag: 'Right', value: 1 })

    const T2 = eitherFromJSON(t.string, NumberFromString)
    assert.deepStrictEqual(T2.encode(right(1)), { _tag: 'Right', value: '1' })
  })
})
