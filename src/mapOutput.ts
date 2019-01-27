import { Type } from 'io-ts'

/** Changes the output type of the given runtime type  */
export const mapOutput = <A, O, I, P>(codec: Type<A, O, I>, f: (p: O) => P, name?: string): Type<A, P, I> =>
  new Type(name === undefined ? codec.name : name, codec.is, codec.validate, a => f(codec.encode(a)))
