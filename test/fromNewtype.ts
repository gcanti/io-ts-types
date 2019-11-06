import * as assert from 'assert'
import * as t from 'io-ts'
import { fromNewtype } from '../src/fromNewtype'
import { assertFailure, assertSuccess } from './helpers'
import { Newtype, iso } from 'newtype-ts'

it('fromNewtype', () => {
  interface Token extends Newtype<{ readonly Token: unique symbol }, string> {}
  const T = fromNewtype<Token>(t.string)
  const token = iso<Token>().wrap('sometoken')
  assertSuccess(T.decode('sometoken'), token)
  assertFailure(T, 42, ['Invalid value 42 supplied to : fromNewtype(string)'])
  assert.ok(T.is('sometoken'))
  assert.deepStrictEqual(T.encode(token), 'sometoken')
  const T2 = fromNewtype<Token>(t.string, 'T2')
  assert.strictEqual(T2.name, 'T2')
})
