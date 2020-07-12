import { date } from '../src'
import { assertFailure, assertSuccess } from './helpers'

describe('Date', () => {
  it('decode', () => {
    const T = date
    assertSuccess(T.decode(new Date(0)), new Date(0))
    assertFailure(T, 1, ['Invalid value 1 supplied to : Date'])
  })
})
