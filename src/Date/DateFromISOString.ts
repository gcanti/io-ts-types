import * as t from 'io-ts'
import { ISOStringDatePrism } from '../monocle-ts/ISOStringDatePrism'

export const DateFromISOString = t.prism(t.string, ISOStringDatePrism.getOption, 'DateFromISOString')
