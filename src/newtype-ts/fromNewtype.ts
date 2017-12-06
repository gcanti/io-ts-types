import { AnyNewtype, Carrier } from 'newtype-ts'
import { Type } from 'io-ts'

export const fromNewtype: <N extends AnyNewtype>(type: Type<any, Carrier<N>>) => Type<any, N> = type => type as any
