import * as assert from 'assert'
import * as _ from '../../src/Decoder/UUID'
import * as E from 'fp-ts/lib/Either'
import * as D from 'io-ts/lib/Decoder'

describe('UUID', () => {
  it('ok', () => {
    assert.deepEqual(
      _.UUID.decode('6e9c5587-a342-4b63-a901-87b31fa2ffa3'),
      E.right('6e9c5587-a342-4b63-a901-87b31fa2ffa3')
    )
  })

  it('ko', () => {
    assert.deepEqual(_.UUID.decode('a'), E.left([D.tree('cannot decode "a", should be UUID')]))
  })
})
