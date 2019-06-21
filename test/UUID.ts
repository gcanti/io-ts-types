import { UUID } from '../src/UUID'
import { assertFailure, assertSuccess } from './helpers'

describe('UUID', () => {
  it('decode', () => {
    const T = UUID
    assertSuccess(T.decode('6e9c5587-a342-4b63-a901-87b31fa2ffa3'), '6e9c5587-a342-4b63-a901-87b31fa2ffa3' as UUID)
    assertFailure(UUID, 'a', ['Invalid value "a" supplied to : UUID'])
  })
})
