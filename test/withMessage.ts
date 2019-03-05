import * as t from 'io-ts'
import { withMessage } from '../src/withMessage'
import { assertSuccess, assertFailure } from './helpers'

describe('withMessage', () => {
  it('should return a custom message', () => {
    const T = withMessage(t.number, () => 'Invalid number')
    assertSuccess(T.decode(1), 1)
    assertFailure(T, null, ['Invalid number'])
  })
})
