import * as t from 'io-ts'
import { assertFailure } from './helpers'
import { withMessage } from '../src/withMessage'

describe('withMessage', () => {
  it('should set the error message', () => {
    const T = withMessage(t.string, u => `${u} is not a string`)
    assertFailure(T, null, ['null is not a string'])
  })
})
