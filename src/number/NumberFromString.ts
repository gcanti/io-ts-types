import * as t from 'io-ts'
import { reverseGet } from '../monocle-ts/TypePrismIso'
import { AnyStringPrism } from '../monocle-ts/AnyStringPrism'
import { StringNumberPrism } from '../monocle-ts/StringNumberPrism'

export const NumberFromString = reverseGet('NumberFromString', AnyStringPrism.compose(StringNumberPrism), t.number.is)
