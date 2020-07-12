import * as assert from 'assert'
import * as t from 'io-ts'
import { fromNullable } from '../src'
import { assertFailure, assertSuccess } from './helpers'

it('fromNullable', () => {
  const T = fromNullable(t.number, 0)
  assertSuccess(T.decode(42), 42)
  assertSuccess(T.decode(null), 0)
  assertSuccess(T.decode(undefined), 0)
  assertFailure(T, {}, ['Invalid value {} supplied to : fromNullable(number)'])
  const T2 = fromNullable(t.number, 0, 'T2')
  assert.strictEqual(T2.name, 'T2')
})
