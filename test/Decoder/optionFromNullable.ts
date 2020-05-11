import * as assert from 'assert'
import * as _ from '../../src/Decoder/optionFromNullable'
import * as E from 'fp-ts/lib/Either'
import * as O from 'fp-ts/lib/Option'
import * as D from 'io-ts/lib/Decoder'

describe('optionFromNullable', () => {
  it('ok', () => {
    assert.deepEqual(_.optionFromNullable(D.number).decode(null), E.right(O.none))
    assert.deepEqual(_.optionFromNullable(D.number).decode(1), E.right(O.some(1)))
  })

  it('ko', () => {
    assert.deepEqual(
      _.optionFromNullable(D.number).decode('a'),
      E.left([
        D.tree('member 0', [D.tree('cannot decode "a", should be null')]),
        D.tree('member 1', [D.tree('cannot decode "a", should be number')])
      ])
    )
  })
})
