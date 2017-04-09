import { Type } from 'io-ts'
import { Prism } from 'monocle-ts'
import { get, reverseGet } from './TypePrismIso'

export function composeTypeWithPrism<A, B>(type: Type<A>, prism: Prism<A, B>, name: string): Type<B> {
  return reverseGet(get(type).compose(prism), name)
}
