import { Prism } from 'monocle-ts'
import { some, none } from 'fp-ts/lib/Option'
import { mixed } from 'io-ts'

export const MixedStringPrism = new Prism<mixed, string>(s => (typeof s === 'string' ? some(s) : none), a => a)
