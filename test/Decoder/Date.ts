import * as assert from 'assert'
import * as _ from '../../src/Decoder/Date'
import * as E from 'fp-ts/lib/Either'
import * as D from 'io-ts/lib/Decoder'

describe('Date', () => {
  it('ok', () => {
    const d = new Date()
    assert.deepEqual(_.Date.decode(d), E.right(d))
  })

  it('ko', () => {
    assert.deepEqual(_.Date.decode(null), E.left([D.tree('cannot decode null, should be Date')]))
  })
})
