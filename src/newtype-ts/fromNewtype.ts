import { AnyNewtype, Carrier } from 'newtype-ts'
import { Type, mixed } from 'io-ts'

export const fromNewtype: <N extends AnyNewtype>(
  type: Type<Carrier<N>, Carrier<N>, mixed>
) => Type<N, Carrier<N>, mixed> = type => type as any
