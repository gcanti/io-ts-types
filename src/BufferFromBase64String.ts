/**
 * @since 0.5.12
 */
import * as t from 'io-ts'
import { either } from 'fp-ts/lib/Either'

const base64regex = /^(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}==|[A-Za-z0-9+/]{3}=)?$/

/**
 * @since 0.5.12
 */
export interface BufferFromBase64StringC extends t.Type<Buffer, string, unknown> {}

/**
 * @example
 * import { BufferFromBase64String } from 'io-ts-types/lib/BigIntFromString'
 * import { right } from 'fp-ts/lib/Either'
 * import { PathReporter } from 'io-ts/lib/PathReporter'
 *
 * assert.deepStrictEqual(BufferFromBase64String.decode(''), right(Buffer.alloc(0)))
 * assert.deepStrictEqual(BufferFromBase64String.decode('aGVsbG8='), right(Buffer.from('aGVsbG8=', 'base64')))
 * assert.deepStrictEqual(PathReporter.report(BufferFromBase64String.decode('aGV     sbG8=')), ['Invalid value "aGV     sbG8=" supplied to : BufferFromBase64String'])
 * assert.deepStrictEqual(PathReporter.report(BufferFromBase64String.decode( '!@#$%^')), ['Invalid value "!@#$%^" supplied to : BufferFromBase64String'])
 * @since 0.5.12
 */
export const BufferFromBase64String: BufferFromBase64StringC = new t.Type<Buffer, string, unknown>(
  'BufferFromBase64String',
  (u): u is Buffer => u instanceof Buffer,
  (u, c) =>
    either.chain(t.string.validate(u, c), s => {
      if (!base64regex.test(s)) {
        return t.failure(u, c)
      }
      return t.success(Buffer.from(s, 'base64'))
    }),
  a => a.toString('base64')
)
