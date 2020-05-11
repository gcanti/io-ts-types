import * as assert from 'assert'
import * as _ from '../../src/Decoder/BooleanFromString'
import * as E from 'fp-ts/lib/Either'
import * as D from 'io-ts/lib/Decoder'

describe('BooleanFromString', () => {
  it('ok', () => {
    assert.deepEqual(_.BooleanFromString.decode('true'), E.right(true))
    assert.deepEqual(_.BooleanFromString.decode('false'), E.right(false))
  })

  it('ko', () => {
    assert.deepEqual(
      _.BooleanFromString.decode(null),
      E.left([D.tree('cannot decode null, should be "true" | "false"')])
    )
  })
})
