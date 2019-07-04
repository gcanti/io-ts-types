import * as assert from 'assert'
import { none, some } from 'fp-ts/lib/Option'
import * as t from 'io-ts'
import { NumberFromString } from '../src/NumberFromString'
import { option } from '../src/option'
import { assertFailure, assertSuccess } from './helpers'

describe('option', () => {
  it('name', () => {
    const T = option(t.number, 'T')
    assert.strictEqual(T.name, 'T')
  })

  it('is', () => {
    const T1 = option(t.number)
    assert.strictEqual(T1.is(some(1)), true)
    assert.strictEqual(T1.is(some('foo')), false)
  })

  it('decode', () => {
    const T1 = option(t.number)
    assertSuccess(T1.decode(none), none)
    assertSuccess(T1.decode(some(1)), some(1))
    assertFailure(T1, some('a'), ['Invalid value "a" supplied to : Option<number>/1: Some<number>/value: number'])

    const T2 = option(NumberFromString)
    assertSuccess(T2.decode(none), none)
    assertSuccess(T2.decode(some('1')), some(1))

    const T3 = option(option(t.number))
    assertSuccess(T3.decode({ _tag: 'Some', value: { _tag: 'Some', value: 1 } }), some(some(1)))
    assertSuccess(T3.decode({ _tag: 'Some', value: { _tag: 'None' } }), some(none))
    assertSuccess(T3.decode({ _tag: 'None' }), none)
  })

  it('encode', () => {
    const T1 = option(t.number)
    assert.deepStrictEqual(T1.encode(none), none)
    assert.deepStrictEqual(T1.encode(some(1)), some(1))

    const T2 = option(NumberFromString)
    assert.deepStrictEqual(T2.encode(none), none)
    assert.deepStrictEqual(T2.encode(some(1)), some('1'))

    const T3 = option(option(t.number))
    assert.deepStrictEqual(T3.encode(none), { _tag: 'None' })
    assert.deepStrictEqual(T3.encode(some(some(1))), { _tag: 'Some', value: { _tag: 'Some', value: 1 } })
    assert.deepStrictEqual(T3.encode(some(none)), { _tag: 'Some', value: { _tag: 'None' } })
  })
})
