/**
 * @since 0.5.17
 */
import * as t from 'io-ts'
import { pipe } from 'fp-ts/lib/pipeable'
import { chain } from 'fp-ts/lib/Either'

/**
 * @since 0.5.17
 */
export interface ArrayFromStringC<C extends t.Type<any, string>> extends t.Type<Array<t.TypeOf<C>>, string> {}

/**
 * @example
 * import { ArrayFromString } from 'io-ts-types/lib/ArrayFromString'
 * import { NumberFromString } from 'io-ts-types/lib/NumberFromString'
 * import { right } from 'fp-ts/lib/Either'
 *
 * assert.deepStrictEqual(ArrayFromString(NumberFromString, ",").decode("1,2,3"), right([1,2,3]))
 * assert.deepStrictEqual(ArrayFromString(NumberFromString, /[\s,]+/).decode("1, 2, 3"), right([1,2,3]))
 * @since 0.5.17
 */
export function ArrayFromString<C extends t.Type<any, string>>(
  codec: C,
  decoderSeparator: string | RegExp = '',
  encoderSeparator = '',
  name = `ArrayFromString<${codec.name}>`
): ArrayFromStringC<C> {
  const arr = t.array(codec)
  return new t.Type<Array<t.TypeOf<C>>, string>(
    name,
    arr.is,
    (u, c) =>
      pipe(
        t.string.validate(u, c),
        chain(str => arr.validate(str.split(decoderSeparator), c))
      ),
    a => arr.encode(a).join(encoderSeparator)
  )
}
