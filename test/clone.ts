import * as assert from 'assert'
import * as t from 'io-ts'
import { clone } from '../src/clone'

describe('clone', () => {
  it('should return a clone of a codec', () => {
    assert.deepStrictEqual(clone(t.string), t.string)
  })
})
