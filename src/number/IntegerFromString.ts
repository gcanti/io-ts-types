import * as t from 'io-ts'
import { NumberFromString } from './NumberFromString'

export const IntegerFromString = t.refinement(NumberFromString, t.Integer.predicate)
