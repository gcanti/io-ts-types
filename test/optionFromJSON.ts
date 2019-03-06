import { assertSuccess, assertFailure } from './helpers'
import { optionFromJSON } from '../src/optionFromJSON'
import * as t from 'io-ts'
import * as assert from 'assert'
import { NumberFromString } from '../src/number/NumberFromString'
import { none, some, Option } from 'fp-ts/lib/Option'

const toJSON = <A>(ma: Option<A>): unknown => JSON.parse(JSON.stringify(ma))

describe('optionFromJSON', () => {
  it('name', () => {
    const T1 = optionFromJSON(t.number)
    assert.strictEqual(T1.name, 'Option<number>')
    const T2 = optionFromJSON(t.number, 'T')
    assert.strictEqual(T2.name, 'T')
  })

  it('is', () => {
    const T1 = optionFromJSON(t.number)
    assert.strictEqual(T1.is(some(1)), true)
    assert.strictEqual(T1.is(some('foo')), false)
  })

  it('decode', () => {
    const T1 = optionFromJSON(t.number)
    assertSuccess(T1.decode(toJSON(none)), none)
    assertSuccess(T1.decode(toJSON(some(1))), some(1))
    assertFailure(T1, toJSON(some('a')), ['Invalid value "a" supplied to : Option<number>/value: number'])
    assertSuccess(T1.decode({ _tag: 'None', a: 'a' }), none)
    assertSuccess(T1.decode({ _tag: 'Some', value: 1, a: 'a' }), some(1))

    assertFailure(T1, null, ['Invalid value null supplied to : Option<number>'])
    assertFailure(T1, {}, ['Invalid value {} supplied to : Option<number>'])
    assertFailure(T1, { _tag: 'Some', value: 'a' }, ['Invalid value "a" supplied to : Option<number>/value: number'])

    const T2 = optionFromJSON(NumberFromString)
    assertSuccess(T2.decode(toJSON(none)), none)
    assertSuccess(T2.decode(toJSON(some('1'))), some(1))

    const T3 = optionFromJSON(optionFromJSON(t.number))
    assertSuccess(T3.decode({ _tag: 'Some', value: { _tag: 'Some', value: 1 } }), some(some(1)))
    assertSuccess(T3.decode({ _tag: 'Some', value: { _tag: 'None' } }), some(none))
    assertSuccess(T3.decode({ _tag: 'None' }), none)
  })

  it('encode', () => {
    const T1 = optionFromJSON(t.number)
    assert.deepStrictEqual(T1.encode(none), toJSON(none))
    assert.deepStrictEqual(T1.encode(some(1)), toJSON(some(1)))

    const T2 = optionFromJSON(NumberFromString)
    assert.deepStrictEqual(T2.encode(none), toJSON(none))
    assert.deepStrictEqual(T2.encode(some(1)), toJSON(some('1')))

    const T3 = optionFromJSON(optionFromJSON(t.number))
    assert.deepStrictEqual(T3.encode(none), { _tag: 'None' })
    assert.deepStrictEqual(T3.encode(some(some(1))), { _tag: 'Some', value: { _tag: 'Some', value: 1 } })
    assert.deepStrictEqual(T3.encode(some(none)), { _tag: 'Some', value: { _tag: 'None' } })
  })
})
