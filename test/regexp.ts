import { regexp } from '../src/regexp'
import { assertSuccess, assertFailure } from './helpers'

describe('RegExp', () => {
  it('should decode RegExp values', () => {
    assertSuccess(regexp.decode(/\w+/), /\w+/)
    assertSuccess(regexp.decode(new RegExp('\\w+')), new RegExp('\\w+'))
  })

  it('should not decode non-Date values', () => {
    assertFailure(regexp, 1, ['Invalid value 1 supplied to : RegExp'])
  })
})
