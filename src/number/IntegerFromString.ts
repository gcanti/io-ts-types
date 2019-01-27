import * as t from 'io-ts'
import { NumberFromString, NumberFromStringType } from './NumberFromString'

export interface IntegerFromStringC extends t.RefinementType<NumberFromStringType, number, string, t.mixed> {}

export const IntegerFromString: IntegerFromStringC = t.refinement(
  NumberFromString,
  t.Integer.predicate,
  'IntegerFromString'
)
