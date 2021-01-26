import { BooleanFromNumber } from '../src'
import { assertSuccess, assertFailure } from './helpers'

describe('BooleanFromNumber', () => {
  it('decode', () => {
    const T = BooleanFromNumber
    assertSuccess(T.decode(0), false)
    assertSuccess(T.decode(1), true)
    assertSuccess(T.decode(123), true)
    assertFailure(T, 'a', ['Invalid value "a" supplied to : BooleanFromNumber'])
  })
})
