import * as assert from 'assert'
import * as _ from '../../src/Decoder/DateFromNumber'
import * as E from 'fp-ts/lib/Either'
import * as D from 'io-ts/lib/Decoder'

describe('DateFromNumber', () => {
  it('ok', () => {
    const d = new Date()
    assert.deepEqual(_.DateFromNumber.decode(d.getTime()), E.right(d))
  })

  it('ko', () => {
    assert.deepEqual(_.DateFromNumber.decode(null), E.left([D.tree('cannot decode null, should be number')]))
    assert.deepEqual(_.DateFromNumber.decode(-Infinity), E.left([D.tree('cannot parse -Infinity to a Date')]))
  })
})
