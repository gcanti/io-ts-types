import * as t from 'io-ts'
import { reverseGet } from '../monocle-ts/TypePrismIso'
import { MixedStringPrism } from '../monocle-ts/MixedStringPrism'
import { StringNumberPrism } from '../monocle-ts/StringNumberPrism'

export const NumberFromString = reverseGet('NumberFromString', MixedStringPrism.compose(StringNumberPrism), t.number.is)
