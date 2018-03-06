import * as t from 'io-ts'
import { NumberFromString, NumberFromStringType } from './NumberFromString'

export const IntegerFromString: t.RefinementType<NumberFromStringType, number, string, t.mixed> = t.refinement(
  NumberFromString,
  t.Integer.predicate,
  'IntegerFromString'
)
