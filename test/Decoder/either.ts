import * as assert from 'assert'
import * as _ from '../../src/Decoder/either'
import * as E from 'fp-ts/lib/Either'
import * as D from 'io-ts/lib/Decoder'

describe('either', () => {
  it('ok', () => {
    assert.deepEqual(_.either(D.string, D.number).decode(E.right(1)), E.right(E.right(1)))
    assert.deepEqual(_.either(D.string, D.number).decode(E.left('a')), E.right(E.left('a')))
  })

  it('ko', () => {
    assert.deepEqual(
      _.either(D.string, D.number).decode(null),
      E.left([D.tree('cannot decode null, should be Record<string, unknown>')])
    )
    assert.deepEqual(
      _.either(D.string, D.number).decode({}),
      E.left([D.tree('required property "_tag"', [D.tree('cannot decode undefined, should be "Left" | "Right"')])])
    )
  })
})
