import * as t from 'io-ts'
import { reverseGet } from '../monocle-ts/TypePrismIso'
import { AnyNumberPrism } from '../monocle-ts/AnyNumberPrism'
import { NumberDatePrism } from '../monocle-ts/NumberDatePrism'

export const DateFromNumber: t.Type<t.mixed, Date> = reverseGet(
  'DateFromNumber',
  AnyNumberPrism.compose(NumberDatePrism),
  (v): v is Date => v instanceof Date
)
