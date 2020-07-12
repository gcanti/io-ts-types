import { assertSuccess, assertFailure } from './helpers'
import { NumberFromString } from '../src'

describe('NumberFromString', () => {
  it('decode', () => {
    const T = NumberFromString
    assertSuccess(T.decode('0'), 0)
    assertSuccess(T.decode('10'), 10)
    assertSuccess(T.decode('-1'), -1)
    assertSuccess(T.decode('11'), 11)
    assertSuccess(T.decode('5.5'), 5.5)
    assertSuccess(T.decode('-5.5'), -5.5)
    assertFailure(T, '', ['Invalid value "" supplied to : NumberFromString'])
    assertFailure(T, ' ', ['Invalid value " " supplied to : NumberFromString'])
    assertFailure(T, 'a', ['Invalid value "a" supplied to : NumberFromString'])
    assertFailure(T, 'a5', ['Invalid value "a5" supplied to : NumberFromString'])
  })
})
