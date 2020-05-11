import * as assert from 'assert'
import * as _ from '../../src/Decoder/IntFromString'
import * as E from 'fp-ts/lib/Either'
import * as D from 'io-ts/lib/Decoder'

describe('IntFromString', () => {
  it('ok', () => {
    assert.deepEqual(_.IntFromString.decode('1'), E.right(1))
  })

  it('ko', () => {
    assert.deepEqual(_.IntFromString.decode(null), E.left([D.tree('cannot decode null, should be string')]))
    assert.deepEqual(_.IntFromString.decode('a'), E.left([D.tree('cannot parse "a" to a number')]))
    assert.deepEqual(_.IntFromString.decode('1.2'), E.left([D.tree('cannot refine "1.2", should be Int')]))
  })
})
