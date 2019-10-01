import { ordNumber } from 'fp-ts/lib/Ord'
import * as t from 'io-ts'
import { either } from '../../src/either'
import { nonEmptyArray } from '../../src/nonEmptyArray'
import { NumberFromString } from '../../src/NumberFromString'
import { option } from '../../src/option'
import { optionFromNullable } from '../../src/optionFromNullable'
import { setFromArray } from '../../src/setFromArray'
import { getEq } from '../../src/getEq'

//
// either
//

const E = either(t.string, NumberFromString)
type EA = t.TypeOf<typeof E> // $ExpectType Either<string, number>
type EO = t.OutputOf<typeof E> // $ExpectType Either<string, string>

//
// nonEmptyArray
//

const NEA = nonEmptyArray(NumberFromString)
type NEAA = t.TypeOf<typeof NEA> // $ExpectType NonEmptyArray<number>
type NEAO = t.OutputOf<typeof NEA> // $ExpectType string[]

//
// option
//

const O = option(NumberFromString)
type OA = t.TypeOf<typeof O> // $ExpectType Option<number>
type OO = t.OutputOf<typeof O> // $ExpectType Option<string>

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
// getEq
//

const Person = t.type({
  name: t.string,
  age: t.number,
  tags: t.array(t.string)
})
const eqPerson = getEq(Person) // $ExpectType Eq<{ name: string; age: number; tags: string[]; }>
