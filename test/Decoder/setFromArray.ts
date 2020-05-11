import * as assert from 'assert'
import * as _ from '../../src/Decoder/setFromArray'
import * as E from 'fp-ts/lib/Either'
import * as D from 'io-ts/lib/Decoder'
import { eqNumber } from 'fp-ts/lib/Eq'

describe('setFromArray', () => {
  it('ok', () => {
    assert.deepEqual(_.setFromArray(eqNumber)(D.number).decode([]), E.right(new Set()))
    assert.deepEqual(_.setFromArray(eqNumber)(D.number).decode([1, 2]), E.right(new Set([1, 2])))
  })

  it('ko', () => {
    assert.deepEqual(
      _.setFromArray(eqNumber)(D.number).decode(['a']),
      E.left([D.tree('item 0', [D.tree('cannot decode "a", should be number')])])
    )
  })
})
