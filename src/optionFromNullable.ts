/**
 * @since 0.5.0
 */
import { pipe } from 'fp-ts/lib/pipeable'
import { map } from 'fp-ts/lib/Either'
import * as O from 'fp-ts/lib/Option'
import * as t from 'io-ts'
import { option } from './option'

/**
 * @since 0.5.0
 */
export interface OptionFromNullableC<C extends t.Mixed>
  extends t.Type<O.Option<t.TypeOf<C>>, t.OutputOf<C> | null, unknown> {}

/**
 * @since 0.5.0
 */
export function optionFromNullable<C extends t.Mixed>(
  codec: C,
  name: string = `Option<${codec.name}>`
): OptionFromNullableC<C> {
  return new t.Type(
    name,
    option(codec).is,
    (u, c) =>
      u == null
        ? t.success(O.none)
        : pipe(
            codec.validate(u, c),
            map(O.some)
          ),
    a =>
      O.toNullable(
        pipe(
          a,
          O.map(codec.encode)
        )
      )
  )
}
