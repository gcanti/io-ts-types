import * as t from 'io-ts'
import { reverseGet } from '../monocle-ts/TypePrismIso'
import { AnyNumberPrism } from '../monocle-ts/AnyNumberPrism'
import { NumberDatePrism } from '../monocle-ts/NumberDatePrism'
import { MillisecondSecondIso } from '../monocle-ts/MillisecondSecondIso'

export const DateFromUnixTime: t.Type<any, Date> = reverseGet(
  'DateFromUnixTime',
  AnyNumberPrism.composeIso(MillisecondSecondIso.reverse()).compose(NumberDatePrism),
  (v): v is Date => v instanceof Date
)
