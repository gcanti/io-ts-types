import { PathReporter } from 'io-ts/lib/PathReporter'
import { right } from 'fp-ts/lib/Either'
import * as assert from 'assert'
import * as t from 'io-ts'
import { NumberFromString } from '../src/NumberFromString'
import { date } from '../src/date'
import { DateFromISOString } from '../src/DateFromISOString'
import { alt } from '../src/alt'

describe('alt', () => {
  it('name', () => {
    const T = alt(t.number, NumberFromString, 'number')
    assert.strictEqual(T.name, 'number')
  })

  it('should both validate check number and string to number', () => {
    const T = alt(t.number, NumberFromString, 'number')
    assert.deepStrictEqual(T.decode('2'), right(2))
    assert.deepStrictEqual(T.decode(2), right(2))
  })

  it('should return a left either if runtime checks fails', () => {
    const T = alt(t.number, NumberFromString, 'number')
    assert.deepStrictEqual(PathReporter.report(T.decode('a')), ['Invalid value "a" supplied to : number'])
  })

  it('should encode with first codec provided', () => {
    const T = alt(DateFromISOString, date)
    const d = new Date(1988, 11, 10)
    assert.strictEqual(T.encode(d), '1988-12-09T20:30:00.000Z')
  })
})
