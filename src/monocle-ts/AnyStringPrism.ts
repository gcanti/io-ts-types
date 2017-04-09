import { Prism } from 'monocle-ts'

export const AnyStringPrism = Prism.fromPredicate(s => typeof s === 'string')
