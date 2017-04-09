import { Type } from 'io-ts'
import { reverseGet } from '../monocle-ts/TypePrismIso'
import { AnyNumberPrism } from '../monocle-ts/AnyNumberPrism'
import { NumberDatePrism } from '../monocle-ts/NumberDatePrism'

export const DateFromNumber: Type<Date> = reverseGet(AnyNumberPrism.compose(NumberDatePrism), 'DateFromNumber')
