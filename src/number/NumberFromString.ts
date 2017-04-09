import { Type } from 'io-ts'
import { reverseGet } from '../monocle-ts/TypePrismIso'
import { AnyStringPrism } from '../monocle-ts/AnyStringPrism'
import { StringNumberPrism } from '../monocle-ts/StringNumberPrism'

export const NumberFromString: Type<number> = reverseGet(AnyStringPrism.compose(StringNumberPrism), 'NumberFromString')
