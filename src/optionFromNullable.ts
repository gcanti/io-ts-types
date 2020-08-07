/**
 * @since 0.5.0
 */
import { either } from 'fp-ts/Either'
import { none, Option, option, some, toNullable } from 'fp-ts/Option'
import * as t from 'io-ts'
import { option as o } from './option'

/**
 * @since 0.5.0
 */
export interface OptionFromNullableC<C extends t.Mixed>
  extends t.Type<Option<t.TypeOf<C>>, t.OutputOf<C> | null, unknown> {}

/**
 * @since 0.5.0
 */
export function optionFromNullable<C extends t.Mixed>(
  codec: C,
  name: string = `Option<${codec.name}>`
): OptionFromNullableC<C> {
  return new t.Type(
    name,
    o(codec).is,
    (u, c) => (u == null ? t.success(none) : either.map(codec.validate(u, c), some)),
    a => toNullable(option.map(a, codec.encode))
  )
}
