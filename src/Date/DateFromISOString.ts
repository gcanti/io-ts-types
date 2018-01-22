import * as t from 'io-ts'
import { reverseGet } from '../monocle-ts/TypePrismIso'
import { AnyStringPrism } from '../monocle-ts/AnyStringPrism'
import { ISOStringDatePrism } from '../monocle-ts/ISOStringDatePrism'

export const DateFromISOString: t.Type<t.mixed, Date> = reverseGet(
  'DateFromISOString',
  AnyStringPrism.compose(ISOStringDatePrism),
  (v): v is Date => v instanceof Date
)
