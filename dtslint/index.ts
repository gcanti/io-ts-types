import * as t from 'io-ts'
import { createOptionFromNullable } from '../src'

//
// createOptionFromNullable
//

const T1 = createOptionFromNullable(t.string)
type T1T1 = t.TypeOf<typeof T1> // $ExpectType Option<string>
type T1T2 = t.OutputOf<typeof T1> // $ExpectType string | null
const T2 = t.type({
  a: createOptionFromNullable(t.string)
})
type T2T1 = t.TypeOf<typeof T2>['a'] // $ExpectType Option<string>
type T2T2 = t.OutputOf<typeof T2>['a'] // $ExpectType string | null
