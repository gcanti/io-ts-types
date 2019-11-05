import * as assert from 'assert'
import * as t from 'io-ts'
import { excess } from '../src/excess'
import { assertFailure, assertSuccess } from './helpers'

describe('excess', () => {
  it('name', () => {
    const T = excess(t.type({ name: t.string }), 'T')
    assert.strictEqual(T.name, 'T')
  })

  it('is', () => {
    const T = excess(t.type({ name: t.string }))
    assert.strictEqual(T.is({ name: 'name' }), true)
    assert.strictEqual(T.is({ name: 'name', surname: 'surname' }), false)

    const P = excess(t.partial({ name: t.string }))
    assert.strictEqual(P.is({}), true)
    assert.strictEqual(P.is({ surname: 'surname' }), false)
  })

  it('decode', () => {
    const T = excess(t.type({ name: t.string }))
    assertSuccess(T.decode({ name: 'name' }), { name: 'name' })
    assertFailure(T, { name: 'name', surname: 'surname' }, [
      'Invalid value {"name":"name","surname":"surname"} supplied to : { name: string }, excess properties: ["surname"]'
    ])

    const P = excess(t.partial({ name: t.string }))
    assertSuccess(P.decode({}), {})
    assertFailure(P, { surname: 'surname' }, [
      'Invalid value {"surname":"surname"} supplied to : Partial<{ name: string }>, excess properties: ["surname"]'
    ])
  })
})
