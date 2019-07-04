import { IntFromString } from '../src/IntFromString'
import { assertSuccess, assertFailure } from './helpers'
import * as t from 'io-ts'

const zero: t.Int = 0 as any
const one: t.Int = 1 as any

describe('IntFromString', () => {
  it('decode', () => {
    const T = IntFromString
    assertSuccess(T.decode('0'), zero)
    assertSuccess(T.decode('1'), one)
    assertFailure(T, 'a', ['Invalid value "a" supplied to : IntFromString'])
    assertFailure(T, '2a', ['Invalid value "2a" supplied to : IntFromString'])
    assertFailure(T, '2.a', ['Invalid value "2.a" supplied to : IntFromString'])
    assertFailure(T, '1.1', ['Invalid value "1.1" supplied to : IntFromString'])
    assertFailure(T, '', ['Invalid value "" supplied to : IntFromString'])
    assertFailure(T, ' ', ['Invalid value " " supplied to : IntFromString'])
  })
})
