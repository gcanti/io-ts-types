import { Prism } from 'monocle-ts'
import { some, none } from 'fp-ts/lib/Option'

export const AnyNumberPrism = new Prism<any, number>(s => (typeof s === 'number' ? some(s) : none), a => a)
