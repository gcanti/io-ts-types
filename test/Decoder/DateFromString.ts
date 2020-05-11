import * as assert from 'assert'
import * as _ from '../../src/Decoder/DateFromString'
import * as E from 'fp-ts/lib/Either'
import * as D from 'io-ts/lib/Decoder'

describe('DateFromString', () => {
  it('ok', () => {
    const d = new Date()
    assert.deepEqual(_.DateFromString.decode(d.toISOString()), E.right(d))
  })

  it('ko', () => {
    assert.deepEqual(_.DateFromString.decode(null), E.left([D.tree('cannot decode null, should be string')]))
    assert.deepEqual(_.DateFromString.decode('a'), E.left([D.tree('cannot parse "a" to a Date')]))
  })
})
