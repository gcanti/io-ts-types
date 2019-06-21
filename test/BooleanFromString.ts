import { BooleanFromString } from '../src/BooleanFromString'
import { assertSuccess, assertFailure } from './helpers'

describe('BooleanFromString', () => {
  it('decode', () => {
    const T = BooleanFromString
    assertSuccess(T.decode('true'), true)
    assertSuccess(T.decode('false'), false)
    assertFailure(T, 'a', ['Invalid value "a" supplied to : BooleanFromString'])
  })
})
