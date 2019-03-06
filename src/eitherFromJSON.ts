import * as t from 'io-ts'
import { Either, Left, Right, left, right } from 'fp-ts/lib/Either'

export type JSONEither<L, A> = { _tag: 'Left'; value: L } | { _tag: 'Right'; value: A }

const jleft = <L, A>(value: L): JSONEither<L, A> => ({ _tag: 'Left', value })

const jright = <L, A>(value: A): JSONEither<L, A> => ({ _tag: 'Right', value })

export interface EitherFromJSONC<L extends t.Mixed, R extends t.Mixed>
  extends t.Type<Either<t.TypeOf<L>, t.TypeOf<R>>, JSONEither<t.OutputOf<L>, t.OutputOf<R>>, unknown> {}

/**
 * Given a codec representing a type `L` and a codec representing a type `A`, returns a codec representing `Either<L, A>` that is able to deserialize
 * the JSON representation of an `Either`.
 *
 * @example
 * import { eitherFromJSON } from 'io-ts-types/lib/eitherFromJSON'
 * import { Either, left, right } from 'fp-ts/lib/Either'
 * import * as t from 'io-ts'
 * import { PathReporter } from 'io-ts/lib/PathReporter'
 *
 * const toJSON = <L, A>(ma: Either<L, A>): unknown => JSON.parse(JSON.stringify(ma))
 *
 * const T = eitherFromJSON(t.string, t.number)
 *
 * assert.deepStrictEqual(T.decode(toJSON(right(1))), right(right(1)))
 * assert.deepStrictEqual(T.decode(toJSON(left('a'))), right(left('a')))
 * assert.deepStrictEqual(PathReporter.report(T.decode(right('a'))), ['Invalid value "a" supplied to : Either<string, number>/value: number'])
 */
export function eitherFromJSON<L extends t.Mixed, R extends t.Mixed>(
  leftCodec: L,
  rightCodec: R,
  name: string = `Either<${leftCodec.name}, ${rightCodec.name}>`
): EitherFromJSONC<L, R> {
  const leftC = t.type({
    value: leftCodec
  })
  const rightC = t.type({
    value: rightCodec
  })
  return new t.Type(
    name,
    (u): u is Either<t.TypeOf<L>, t.TypeOf<R>> =>
      (u instanceof Left && leftCodec.is(u.value)) || (u instanceof Right && rightCodec.is(u.value)),
    (u, c) =>
      t.UnknownRecord.validate(u, c).chain(o => {
        if (o._tag === 'Left') {
          return leftC.validate(o, c).map(s => left(s.value))
        } else if (o._tag === 'Right') {
          return rightC.validate(o, c).map(s => right(s.value))
        } else {
          return t.failure(u, c)
        }
      }),
    a => a.fold(l => jleft(leftCodec.encode(l)), a => jright(rightCodec.encode(a)))
  )
}
