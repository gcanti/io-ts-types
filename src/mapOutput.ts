import { Type } from 'io-ts'

/**
 * Changes the output type of the given runtime type
 *
 * @example
 * import * as t from 'io-ts'
 * import { mapOutput } from 'io-ts-types/lib/mapOutput'
 * import { createOptionFromNullable } from 'io-ts-types/lib/fp-ts/createOptionFromNullable'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * // Input: t.Type<Option<number>, number | null, t.mixed>
 * const Input = createOptionFromNullable(t.number)
 *
 * const toUndefined = <A>(x: A | null): A | undefined => (x === null ? undefined : x)
 *
 * // Output: t.Type<Option<number>, number | undefined, t.mixed>
 * const Output = mapOutput(Input, toUndefined)
 *
 * assert.strictEqual(Output.encode(none), undefined)
 * assert.strictEqual(Output.encode(some(1)), 1)
 */
export function mapOutput<A, O, I, P>(codec: Type<A, O, I>, f: (p: O) => P, name: string = codec.name): Type<A, P, I> {
  return new Type(name, codec.is, codec.validate, a => f(codec.encode(a)))
}
