/**
 * @since 0.5.19
 */
import * as t from 'io-ts'
import { pipe } from 'fp-ts/lib/pipeable'
import { chain } from 'fp-ts/lib/Either'

const base64RegExp = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/

/**
 * @since 0.5.19
 */
export interface BufferFromBase64C extends t.Type<Buffer, string, unknown> {}

/**
 * @example
 * import { BufferFromBase64 } from 'io-ts-types/lib/BufferFromBase64'
 * import { right } from 'fp-ts/lib/Either'
 *
 * const base64String = 'dGVzdCBvZiB0aGUgY29kZWM='
 * assert.deepStrictEqual(BufferFromBase64.decode(base64String), right(Buffer.from('test of the codec')))
 *
 * @since 0.5.19
 */
export const BufferFromBase64: BufferFromBase64C = new t.Type<Buffer, string, unknown>(
  'BufferFromBase64',
  (u): u is Buffer => Buffer.isBuffer(u),
  (u, c) =>
    pipe(
      t.string.validate(u, c),
      chain(s => (base64RegExp.test(s) ? t.success(Buffer.from(s, 'base64')) : t.failure(u, c)))
    ),
  b => b.toString('base64')
)
