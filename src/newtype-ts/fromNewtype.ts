import { AnyNewtype, CarrierOf } from 'newtype-ts'
import { Type, mixed } from 'io-ts'

export const fromNewtype: <N extends AnyNewtype>(
  type: Type<CarrierOf<N>, CarrierOf<N>, mixed>
) => Type<N, CarrierOf<N>, mixed> = type => type as any
