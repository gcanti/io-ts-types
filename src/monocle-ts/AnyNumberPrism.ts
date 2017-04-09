import { Prism } from 'monocle-ts'

export const AnyNumberPrism = Prism.fromPredicate(s => typeof s === 'number')
