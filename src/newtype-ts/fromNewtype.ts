import { AnyNewtype, Carrier } from 'newtype-ts'
import { Type, mixed } from 'io-ts'

export const fromNewtype: <N extends AnyNewtype>(type: Type<mixed, Carrier<N>>) => Type<mixed, N> = type => type as any
