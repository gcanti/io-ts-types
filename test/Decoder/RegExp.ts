import * as assert from 'assert'
import * as _ from '../../src/Decoder/RegExp'
import * as E from 'fp-ts/lib/Either'
import * as D from 'io-ts/lib/Decoder'

describe('RegExp', () => {
  it('ok', () => {
    assert.deepEqual(_.RegExp.decode(new RegExp('\\w+')), E.right(new RegExp('\\w+')))
  })

  it('ko', () => {
    assert.deepEqual(_.RegExp.decode(null), E.left([D.tree('cannot decode null, should be RegExp')]))
  })
})
