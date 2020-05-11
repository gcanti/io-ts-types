import * as assert from 'assert'
import * as _ from '../../src/Decoder/fromNullable'
import * as E from 'fp-ts/lib/Either'
import * as D from 'io-ts/lib/Decoder'

describe('withFallback', () => {
  it('ok', () => {
    assert.deepEqual(_.fromNullable(D.number, 0).decode(1), E.right(1))
    assert.deepEqual(_.fromNullable(D.number, 0).decode(null), E.right(0))
  })

  it('ko', () => {
    assert.deepEqual(_.fromNullable(D.number, 0).decode('a'), E.left([D.tree('cannot decode "a", should be number')]))
  })
})
