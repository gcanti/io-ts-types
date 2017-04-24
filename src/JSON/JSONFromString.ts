import * as t from 'io-ts'
import { JSON, StringJSONPrism } from '../monocle-ts/StringJSONPrism'

export type JSON = JSON

export const JSONFromString = t.prism(t.string, StringJSONPrism.getOption, 'JSONFromString')
