import * as assert from 'assert'
import * as _ from '../../src/Decoder/NonEmptyString'
import * as E from 'fp-ts/lib/Either'
import * as D from 'io-ts/lib/Decoder'

describe('NonEmptyString', () => {
  it('ok', () => {
    assert.deepEqual(_.NonEmptyString.decode('a'), E.right('a'))
  })

  it('ko', () => {
    assert.deepEqual(_.NonEmptyString.decode(null), E.left([D.tree('cannot decode null, should be NonEmptyString')]))
    assert.deepEqual(_.NonEmptyString.decode(''), E.left([D.tree('cannot decode "", should be NonEmptyString')]))
  })
})
