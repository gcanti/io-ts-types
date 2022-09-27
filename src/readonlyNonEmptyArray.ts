/**
 * @since 0.5.7
 */
import * as t from 'io-ts'
import { nonEmptyArray } from './nonEmptyArray'

/**
 * @since 0.5.7
 */
export interface ReadonlyNonEmptyArray<A> extends ReadonlyArray<A> {
  readonly 0: A
}

/**
 * @since 0.5.7
 */
export interface ReadonlyNonEmptyArrayC<C extends t.Mixed>
  extends t.Type<ReadonlyNonEmptyArray<t.TypeOf<C>>, ReadonlyNonEmptyArray<t.OutputOf<C>>, unknown> {}

/**
 * @since 0.5.7
 */
export function readonlyNonEmptyArray<C extends t.Mixed>(
  codec: C,
  name: string = `ReadonlyNonEmptyArray<${codec.name}>`
): ReadonlyNonEmptyArrayC<C> {
  return nonEmptyArray(codec, name) as any
}
