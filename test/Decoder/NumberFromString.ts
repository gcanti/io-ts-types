import * as assert from 'assert'
import * as _ from '../../src/Decoder/NumberFromString'
import * as E from 'fp-ts/lib/Either'
import * as D from 'io-ts/lib/Decoder'

describe('NumberFromString', () => {
  it('ok', () => {
    assert.deepEqual(_.NumberFromString.decode('1'), E.right(1))
    assert.deepEqual(_.NumberFromString.decode('1.2'), E.right(1.2))
  })

  it('ko', () => {
    assert.deepEqual(_.NumberFromString.decode(null), E.left([D.tree('cannot decode null, should be string')]))
    assert.deepEqual(_.NumberFromString.decode('a'), E.left([D.tree('cannot parse "a" to a number')]))
  })
})
