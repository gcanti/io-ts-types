import * as assert from 'assert'
import * as _ from '../../src/Decoder/nonEmptyArray'
import * as E from 'fp-ts/lib/Either'
import * as D from 'io-ts/lib/Decoder'

describe('option', () => {
  it('ok', () => {
    assert.deepEqual(_.nonEmptyArray(D.number).decode([1]), E.right([1]))
  })

  it('ko', () => {
    assert.deepEqual(
      _.nonEmptyArray(D.number).decode(null),
      E.left([D.tree('cannot decode null, should be Array<unknown>')])
    )
    assert.deepEqual(
      _.nonEmptyArray(D.number).decode([]),
      E.left([D.tree('cannot refine [], should be NonEmptyArray')])
    )
    assert.deepEqual(
      _.nonEmptyArray(D.number).decode(['a']),
      E.left([D.tree('item 0', [D.tree('cannot decode "a", should be number')])])
    )
  })
})
