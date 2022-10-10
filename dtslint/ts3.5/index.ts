import { ordNumber } from 'fp-ts/lib/Ord'
import * as t from 'io-ts'
import { either, nonEmptyArray, NumberFromString, option, optionFromNullable, setFromArray, Json } from '../../src'

//
// either
//

const E = either(t.string, NumberFromString)
type EA = t.TypeOf<typeof E> // $ExpectType Either<string, number>
type EO = t.OutputOf<typeof E> // $ExpectType EitherOutput<string, string>

//
// nonEmptyArray
//

const NEA = nonEmptyArray(NumberFromString)
type NEAA = t.TypeOf<typeof NEA> // $ExpectType NonEmptyArray<number>
type NEAO = t.OutputOf<typeof NEA> // $ExpectType NonEmptyArray<string>

nonEmptyArray(t.unknown).pipe(nonEmptyArray(t.unknown))

//
// option
//

const O = option(NumberFromString)
type OA = t.TypeOf<typeof O> // $ExpectType Option<number>
type OO = t.OutputOf<typeof O> // $ExpectType OptionOutput<string>

//
// optionFromNullable
//

const OFN = optionFromNullable(NumberFromString)
type OFNA = t.TypeOf<typeof OFN> // $ExpectType Option<number>
type OFNO = t.OutputOf<typeof OFN> // $ExpectType string | null

//
// setFromArray
//

const SFA = setFromArray(NumberFromString, ordNumber)
type SFAA = t.TypeOf<typeof SFA> // $ExpectType Set<number>
type SFAO = t.OutputOf<typeof SFA> // $ExpectType string[]

//
// Json.pipe
//
const JO = Json.pipe(option(t.string)) // $ExpectType Type<Option<string>, Json, unknown>
const JE = Json.pipe(either(t.string, t.number)) // $ExpectType Type<Either<string, number>, Json, unknown>
