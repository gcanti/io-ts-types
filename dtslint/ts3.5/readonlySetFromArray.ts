import * as t from 'io-ts'
import { readonlySetFromArray } from '../../src'
import { ordString } from 'fp-ts/Ord'

const RS = readonlySetFromArray(t.string, ordString)

RS.decode // $ExpectType (i: unknown) => Either<Errors, ReadonlySet<string>>

RS.is // $ExpectType Is<ReadonlySet<string>>

RS.encode // $ExpectType Encode<ReadonlySet<string>, readonly string[]>
