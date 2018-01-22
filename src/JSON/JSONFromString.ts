import * as t from 'io-ts'
import { reverseGet } from '../monocle-ts/TypePrismIso'
import { AnyStringPrism } from '../monocle-ts/AnyStringPrism'
import { JSONType, StringJSONPrism } from '../monocle-ts/StringJSONPrism'
import { JSONTypeRT } from './JSONTypeRT'

export type JSONType = JSONType

export const JSONFromString: t.Type<t.mixed, JSONType> = reverseGet(
  'JSONFromString',
  AnyStringPrism.compose(StringJSONPrism),
  JSONTypeRT.is
)
