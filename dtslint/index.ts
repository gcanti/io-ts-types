import * as t from 'io-ts'
import {
  createEitherFromJSON,
  createNonEmptyArrayFromArray,
  createOptionFromJSON,
  createOptionFromNullable,
  createSetFromArray,
  createStrMapFromDictionary
} from '../src'
import { ordString } from 'fp-ts/lib/Ord'

//
// createEitherFromJSON
//

const T1 = createEitherFromJSON(t.string, t.number)
type T1T1 = t.TypeOf<typeof T1> // $ExpectType Either<string, number>
type T1T2 = t.OutputOf<typeof T1> // $ExpectType JSONEither<string, number>
const T2 = t.type({
  a: createEitherFromJSON(t.string, t.number)
})
type T2T1 = t.TypeOf<typeof T2>['a'] // $ExpectType Either<string, number>
type T2T2 = t.OutputOf<typeof T2>['a'] // $ExpectType JSONEither<string, number>

//
// createNonEmptyArrayFromArray
//

const T3 = createNonEmptyArrayFromArray(t.string)
type T3T1 = t.TypeOf<typeof T3> // $ExpectType NonEmptyArray<string>
type T3T2 = t.OutputOf<typeof T3> // $ExpectType string[]
const T4 = t.type({
  a: createNonEmptyArrayFromArray(t.string)
})
type T4T1 = t.TypeOf<typeof T4>['a'] // $ExpectType NonEmptyArray<string>
type T4T2 = t.OutputOf<typeof T4>['a'] // $ExpectType string[]

//
// createOptionFromJSON
//

const T5 = createOptionFromJSON(t.string)
type T5T1 = t.TypeOf<typeof T5> // $ExpectType Option<string>
type T5T2 = t.OutputOf<typeof T5> // $ExpectType JSONOption<string>
const T6 = t.type({
  a: createOptionFromJSON(t.string)
})
type T6T1 = t.TypeOf<typeof T6>['a'] // $ExpectType Option<string>
type T6T2 = t.OutputOf<typeof T6>['a'] // $ExpectType JSONOption<string>

//
// createOptionFromNullable
//

const T7 = createOptionFromNullable(t.string)
type T7T1 = t.TypeOf<typeof T7> // $ExpectType Option<string>
type T7T2 = t.OutputOf<typeof T7> // $ExpectType string | null
const T8 = t.type({
  a: createOptionFromNullable(t.string)
})
type T8T1 = t.TypeOf<typeof T8>['a'] // $ExpectType Option<string>
type T8T2 = t.OutputOf<typeof T8>['a'] // $ExpectType string | null

//
// createSetFromArray
//

const T9 = createSetFromArray(t.string, ordString)
type T9T1 = t.TypeOf<typeof T9> // $ExpectType Set<string>
type T9T2 = t.OutputOf<typeof T9> // $ExpectType string[]
const T10 = t.type({
  a: createSetFromArray(t.string, ordString)
})
type T10T1 = t.TypeOf<typeof T10>['a'] // $ExpectType Set<string>
type T10T2 = t.OutputOf<typeof T10>['a'] // $ExpectType string[]

//
// createStrMapFromDictionary
//

const T11 = createStrMapFromDictionary(t.string)
type T11T1 = t.TypeOf<typeof T11> // $ExpectType StrMap<string>
type T11T2 = t.OutputOf<typeof T11> // $ExpectType Record<string, string>
const T12 = t.type({
  a: createStrMapFromDictionary(t.string)
})
type T12T1 = t.TypeOf<typeof T12>['a'] // $ExpectType StrMap<string>
type T12T2 = t.OutputOf<typeof T12>['a'] // $ExpectType Record<string, string>
