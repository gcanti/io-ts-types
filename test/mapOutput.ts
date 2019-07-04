import * as assert from 'assert'
import * as t from 'io-ts'
import { mapOutput } from '../src/mapOutput'

describe('mapOutput', () => {
  it('name', () => {
    const T = mapOutput(t.string, s => `(${s})`, 'T')
    assert.strictEqual(T.name, 'T')
  })

  it('should map the output of encode', () => {
    const T = mapOutput(t.string, s => `(${s})`)
    assert.strictEqual(T.encode('a'), '(a)')
  })
})
