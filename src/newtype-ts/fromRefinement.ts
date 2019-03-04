import { AnyNewtype, CarrierOf } from 'newtype-ts'
import { Prism } from 'monocle-ts'
import { Type, success, failure } from 'io-ts'

export const fromRefinement: <S extends AnyNewtype = never>() => <O>(
  carrier: Type<CarrierOf<S>, O, unknown>,
  prism: Prism<CarrierOf<S>, S>,
  name?: string
) => Type<S, O, unknown> = <S extends AnyNewtype = never>() => <O>(
  carrier: Type<CarrierOf<S>, O, unknown>,
  prism: Prism<CarrierOf<S>, S>,
  name: string = `Refinement<${carrier.name}>`
) =>
  new Type(
    name,
    (u): u is S => carrier.is(u) && prism.getOption(u).isSome(),
    (u, c) => carrier.validate(u, c).chain(s => prism.getOption(s).foldL(() => failure(s, c), success)),
    a => carrier.encode(a)
  )
