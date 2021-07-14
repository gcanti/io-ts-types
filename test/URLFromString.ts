import * as assert from 'assert'
import { URL } from 'url'
import { URLFromString } from '../src'
import { assertFailure, assertSuccess } from './helpers'

describe('BigIntFromString', () => {
  it('is', () => {
    const T = URLFromString
    assert.strictEqual(T.is(new URL('https://gcanti.github.io/io-ts-types/')), true)
    assert.strictEqual(T.is(new URL('ftp://gcanti.github.io/io-ts-types/')), true)
    assert.strictEqual(T.is(''), false)
    assert.strictEqual(T.is('/djulio'), false)
    assert.strictEqual(T.is(null), false)
  })
  it('decode', () => {
    const T = URLFromString
    assertSuccess(T.decode('https://gcanti.github.io/io-ts-types/'), new URL('https://gcanti.github.io/io-ts-types/'))
    assertFailure(T, '/djulio', ['Invalid value "/djulio" supplied to : URLFromString'])
    assertFailure(T, '', ['Invalid value "" supplied to : URLFromString'])
  })
  it('encode', () => {
    const T = URLFromString
    assert.deepStrictEqual(T.encode(new URL('https://gcanti.github.io/io-ts-types/')), 'https://gcanti.github.io/io-ts-types/')
  })
})
