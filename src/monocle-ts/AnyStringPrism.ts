import { Prism } from 'monocle-ts'
import { some, none } from 'fp-ts/lib/Option'

export const AnyStringPrism = new Prism<any, string>(s => (typeof s === 'string' ? some(s) : none), a => a)
