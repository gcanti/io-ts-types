import { Type } from 'io-ts'

/** Changes the output type of the given runtime type  */
export const mapOutput = <A, O, I, P>(type: Type<A, O, I>, f: (p: O) => P, name?: string): Type<A, P, I> =>
  new Type(typeof name === 'undefined' ? type.name : name, type.is, type.validate, a => f(type.encode(a)))
