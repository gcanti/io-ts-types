import * as assert from 'assert'
import { ArrayFromString, NumberFromString } from '../src'
import { assertSuccess, assertFailure } from './helpers'

describe('ArrayFromString', () => {
  it('name', () => {
    const T = ArrayFromString(NumberFromString, undefined, undefined, 'T')
    assert.strictEqual(T.name, 'T')
  })
  it('is', () => {
    const T = ArrayFromString(NumberFromString)
    assert.strictEqual(T.is([1, 2]), true)
    assert.strictEqual(T.is(['1', 2]), false)
    assert.strictEqual(T.is('1,2'), false)
  })
  it('decode', () => {
    const T = ArrayFromString(NumberFromString, /[\s,]+/)
    assertSuccess(T.decode('1,2,3'), [1, 2, 3])
    assertSuccess(T.decode('1, 2, 3'), [1, 2, 3])
    assertFailure(T, 1, ['Invalid value 1 supplied to : ArrayFromString<NumberFromString>'])
    assertFailure(T, 'a', ['Invalid value "a" supplied to : ArrayFromString<NumberFromString>/0: NumberFromString'])
    assertFailure(T, '1,a', ['Invalid value "a" supplied to : ArrayFromString<NumberFromString>/1: NumberFromString'])
    assertFailure(T, '[1,2]', [
      'Invalid value "[1" supplied to : ArrayFromString<NumberFromString>/0: NumberFromString',
      'Invalid value "2]" supplied to : ArrayFromString<NumberFromString>/1: NumberFromString'
    ])
  })
  it('encode', () => {
    const T = ArrayFromString(NumberFromString)
    assert.strictEqual(T.encode([1, 2, 3]), '123')

    const T2 = ArrayFromString(NumberFromString, undefined, '+')
    assert.strictEqual(T2.encode([1, 2, 3]), '1+2+3')
  })
})
