import { AnyNewtype, CarrierOf } from 'newtype-ts'
import { Type, mixed } from 'io-ts'

export const fromNewtype: <N extends AnyNewtype = never>(
  codec: Type<CarrierOf<N>, CarrierOf<N>, mixed>
) => Type<N, CarrierOf<N>, mixed> = type => type as any

export const fromNewtypeCurried: <N extends AnyNewtype = never>() => <O>(
  codec: Type<CarrierOf<N>, O, mixed>
) => Type<N, O, mixed> = () => type => type as any
