import * as t from 'io-ts'
import { readonlyNonEmptyArray } from '../../src/readonlyNonEmptyArray'

const RNAS = readonlyNonEmptyArray(t.string)

RNAS.decode // $ExpectType (i: unknown) => Either<Errors, ReadonlyNonEmptyArray<string>>

RNAS.is // $ExpectType Is<ReadonlyNonEmptyArray<string>>

RNAS.encode // $ExpectType Encode<ReadonlyNonEmptyArray<string>, readonly string[]>
