import { Integer } from 'io-ts'
import { Prism } from 'monocle-ts'

export const NumberIntegerPrism: Prism<number, number> = Prism.fromPredicate(Integer.predicate)
