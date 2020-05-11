import * as assert from 'assert'
import * as _ from '../../src/Decoder/option'
import * as E from 'fp-ts/lib/Either'
import * as O from 'fp-ts/lib/Option'
import * as D from 'io-ts/lib/Decoder'

describe('option', () => {
  it('ok', () => {
    assert.deepEqual(_.option(D.number).decode(O.none), E.right(O.none))
    assert.deepEqual(_.option(D.number).decode(O.some(1)), E.right(O.some(1)))
  })

  it('ko', () => {
    assert.deepEqual(
      _.option(D.number).decode(null),
      E.left([D.tree('cannot decode null, should be Record<string, unknown>')])
    )
    assert.deepEqual(
      _.option(D.number).decode({}),
      E.left([D.tree('required property "_tag"', [D.tree('cannot decode undefined, should be "None" | "Some"')])])
    )
    assert.deepEqual(
      _.option(D.number).decode(O.some('a')),
      E.left([D.tree('required property "value"', [D.tree('cannot decode "a", should be number')])])
    )
  })
})
