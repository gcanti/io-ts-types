import * as t from 'io-ts'
import { NumberDatePrism } from '../monocle-ts/NumberDatePrism'

export const DateFromNumber = t.prism(t.number, NumberDatePrism.getOption, 'DateFromNumber')
