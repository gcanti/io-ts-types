/**
 * @since 0.5.17
 */
import * as t from 'io-ts'
import { pipe } from 'fp-ts/lib/pipeable'
import { map, Traversable } from 'fp-ts/lib/Array'
import { chain, Applicative } from 'fp-ts/lib/Either'

/**
 * @since 0.5.17
 */
export interface ArrayFromStringC<C extends t.Mixed> extends t.Type<Array<t.TypeOf<C>>, string, unknown> {}

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
export function ArrayFromString<C extends t.Mixed>(
  codec: C,
  decoderSeparator: string | RegExp = '',
  encoderSeparator = '',
  name = `ArrayFromString<${codec.name}>`
): ArrayFromStringC<C> {
  return new t.Type<Array<t.TypeOf<C>>, string, unknown>(
    name,
    (u): u is Array<t.TypeOf<C>> => u instanceof Array && u.every(codec.is),
    (u, c) =>
      pipe(
        t.string.validate(u, c),
        chain((str: string) =>
          pipe(
            str.split(decoderSeparator),
            map(codec.decode),
            Traversable.sequence(Applicative)
          )
        ),
        chain(t.success)
      ),
    (a: Array<t.TypeOf<C>>) => map(codec.encode)(a).join(encoderSeparator)
  )
}
