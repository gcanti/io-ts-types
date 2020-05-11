import * as assert from 'assert'
import * as _ from '../../src/Decoder/Int'
import * as E from 'fp-ts/lib/Either'
import * as D from 'io-ts/lib/Decoder'

describe('Int', () => {
  it('ok', () => {
    assert.deepEqual(_.Int.decode(1), E.right(1))
  })

  it('ko', () => {
    assert.deepEqual(_.Int.decode(null), E.left([D.tree('cannot decode null, should be Int')]))
    assert.deepEqual(_.Int.decode(1.2), E.left([D.tree('cannot decode 1.2, should be Int')]))
  })
})
