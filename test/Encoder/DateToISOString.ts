import * as assert from 'assert'
import * as _ from '../../src/Encoder/DateToISOString'

describe('DateToISOString', () => {
  it('encode', () => {
    const d = new Date(2000, 1, 1)
    assert.deepEqual(_.DateToISOString.encode(d), '2000-01-31T23:00:00.000Z')
  })
})
