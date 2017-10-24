import { Prism } from 'monocle-ts'

export const AnyStringPrism: Prism<any, string> = Prism.fromPredicate(s => typeof s === 'string')
