import * as t from 'io-ts'
import { JSONType, StringJSONPrism } from '../monocle-ts/StringJSONPrism'

export type JSONType = JSONType

export const JSONFromString = t.prism(t.string, StringJSONPrism.getOption, 'JSONFromString')
