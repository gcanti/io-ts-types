import * as assert from 'assert'
import * as _ from '../../src/Decoder/withFallback'
import * as E from 'fp-ts/lib/Either'
import * as D from 'io-ts/lib/Decoder'

describe('withFallback', () => {
  it('ok', () => {
    assert.deepEqual(_.withFallback(D.number, 0).decode(1), E.right(1))
    assert.deepEqual(_.withFallback(D.number, 0).decode('a'), E.right(0))
  })
})
