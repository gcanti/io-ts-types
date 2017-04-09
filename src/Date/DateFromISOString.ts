import { Type } from 'io-ts'
import { reverseGet } from '../monocle-ts/TypePrismIso'
import { AnyStringPrism } from '../monocle-ts/AnyStringPrism'
import { ISOStringDatePrism } from '../monocle-ts/ISOStringDatePrism'

export const DateFromISOString: Type<Date> = reverseGet(AnyStringPrism.compose(ISOStringDatePrism), 'DateFromISOString')
