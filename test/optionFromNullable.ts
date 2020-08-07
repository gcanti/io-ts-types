import { assertSuccess, assertFailure } from './helpers'
import { optionFromNullable } from '../src'
import * as t from 'io-ts'
import * as assert from 'assert'
import { NumberFromString } from '../src'
import { none, some } from 'fp-ts/Option'

describe('optionFromNullable', () => {
  it('name', () => {
    const T = optionFromNullable(t.number, 'T')
    assert.strictEqual(T.name, 'T')
  })

  it('is', () => {
    const T1 = optionFromNullable(t.number)
    assert.strictEqual(T1.is(some(1)), true)
    assert.strictEqual(T1.is(some('foo')), false)
  })

  it('decode', () => {
    const T1 = optionFromNullable(t.number)
    assertSuccess(T1.decode(null), none)
    assertSuccess(T1.decode(undefined), none)
    assertSuccess(T1.decode(1), some(1))
    assertFailure(T1, 'a', ['Invalid value "a" supplied to : Option<number>'])

    const T2 = optionFromNullable(NumberFromString)
    assertSuccess(T2.decode(null), none)
    assertSuccess(T2.decode('1'), some(1))
  })

  it('encode', () => {
    const T1 = optionFromNullable(t.number)
    assert.strictEqual(T1.encode(some(1)), 1)
    assert.strictEqual(T1.encode(none), null)
    const T2 = optionFromNullable(NumberFromString)
    assert.strictEqual(T2.encode(none), null)
    assert.strictEqual(T2.encode(some(1)), '1')
  })
})
