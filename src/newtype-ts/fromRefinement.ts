import { AnyNewtype, CarrierOf } from 'newtype-ts'
import { Prism } from 'monocle-ts'
import { Type, mixed, success, failure } from 'io-ts'

export const fromRefinement = <S extends AnyNewtype = never>() => <O>(
  carrier: Type<CarrierOf<S>, O, mixed>,
  prism: Prism<CarrierOf<S>, S>,
  name: string = `Refinement<${carrier.name}>`
): Type<S, O, mixed> =>
  new Type(
    name,
    (m): m is S => carrier.is(m) && prism.getOption(m).isSome(),
    (m, c) => carrier.validate(m, c).chain(s => prism.getOption(s).foldL(() => failure(s, c), success)),
    a => carrier.encode(a)
  )
