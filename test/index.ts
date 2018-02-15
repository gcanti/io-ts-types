import * as assert from 'assert'
import * as t from 'io-ts'
import { PathReporter } from 'io-ts/lib/PathReporter'
import { iso } from 'newtype-ts'

import {
  DateFromISOString,
  DateFromNumber,
  DateFromUnixTime,
  IntegerFromString,
  JSONFromString,
  JSONTypeRT,
  NumberFromString,
  createEitherFromJSON,
  createOptionFromJSON,
  createOptionFromNullable,
  createNonEmptyArrayFromArray,
  fromNewtype,
  lensesFromProps,
  lensesFromInterface
} from '../src'
import { left, right } from 'fp-ts/lib/Either'
import { none, some } from 'fp-ts/lib/Option'

import { Newtype } from 'newtype-ts'
import { Validation } from 'io-ts'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

describe('fp-ts', () => {
  it('createOptionFromNullable', () => {
    const T = createOptionFromNullable(t.number)
    assert.deepEqual(T.decode(null), right(none))
    assert.deepEqual(T.decode(undefined), right(none))
    assert.deepEqual(T.decode(1), right(some(1)))
    assert.deepEqual(T.encode(some(1)), 1)
    assert.deepEqual(T.encode(none), null)
    assert.strictEqual(T.is(some(1)), true)
    assert.strictEqual(T.is(some('foo')), false)
  })

  it('createOptionFromJSON', () => {
    const T = createOptionFromJSON(t.number)
    assert.deepEqual(T.decode({ type: 'Option', value: null }), right(none))
    assert.deepEqual(T.decode({ type: 'Option', value: undefined }), right(none))
    assert.deepEqual(T.decode({ type: 'Option', value: 1 }), right(some(1)))
    assert.deepEqual(T.encode(some(1)), { type: 'Option', value: 1 })
    assert.deepEqual(T.encode(none), { type: 'Option', value: null })
    assert.strictEqual(T.is(some(1)), true)
    assert.strictEqual(T.is(some('foo')), false)
  })

  it('createOptionOfOptionFromJSON', () => {
    const T = createOptionFromJSON(createOptionFromJSON(t.number))
    assert.deepEqual(T.decode({ type: 'Option', value: { type: 'Option', value: 1 } }), right(some(some(1))))
    assert.deepEqual(T.encode(some(some(1))), { type: 'Option', value: { type: 'Option', value: 1 } })
    assert.deepEqual(T.encode(some(none)), { type: 'Option', value: { type: 'Option', value: null } })
    assert.deepEqual(T.decode({ type: 'Option', value: { type: 'Option', value: null } }), right(some(none)))
    assert.deepEqual(T.encode(none), { type: 'Option', value: null })
    assert.deepEqual(T.decode({ type: 'Option', value: null }), right(none))
  })

  it('createEitherFromJSON', () => {
    const T = createEitherFromJSON(t.string, t.number)
    assert.deepEqual(T.decode({ type: 'Left', value: 's' }), right(left('s')))
    assert.deepEqual(T.decode({ type: 'Right', value: 1 }), right(right(1)))
    assert.deepEqual(T.encode(left('a')), { type: 'Left', value: 'a' })
    assert.deepEqual(T.encode(right(1)), { type: 'Right', value: 1 })
    assert.strictEqual(T.is(right(1)), true)
    assert.strictEqual(T.is(right('foo')), false)
    assert.strictEqual(T.is(left(1)), false)
    assert.strictEqual(T.is(left('foo')), true)
  })

  it('createEitherOfOptionFromJSON', () => {
    const T = createEitherFromJSON(createOptionFromJSON(t.string), createOptionFromJSON(t.number))
    assert.deepEqual(T.decode({ type: 'Left', value: { type: 'Option', value: 's' } }), right(left(some('s'))))
    assert.deepEqual(T.decode({ type: 'Right', value: { type: 'Option', value: 1 } }), right(right(some(1))))
    assert.deepEqual(T.decode({ type: 'Left', value: { type: 'Option', value: null } }), right(left(none)))
    assert.deepEqual(T.decode({ type: 'Right', value: { type: 'Option', value: null } }), right(right(none)))
    assert.deepEqual(T.encode(left(some('a'))), { type: 'Left', value: { type: 'Option', value: 'a' } })
    assert.deepEqual(T.encode(right(some(1))), { type: 'Right', value: { type: 'Option', value: 1 } })
    assert.deepEqual(T.encode(left(none)), { type: 'Left', value: { type: 'Option', value: null } })
    assert.deepEqual(T.encode(right(none)), { type: 'Right', value: { type: 'Option', value: null } })
  })

  it('createNonEmptyArrayFromArray', () => {
    const T = createNonEmptyArrayFromArray(t.number)
    assert.deepEqual(PathReporter.report(T.decode(null)), ['Invalid value null supplied to : NonEmptyArray<number>'])
    assert.deepEqual(PathReporter.report(T.decode([])), ['Invalid value [] supplied to : NonEmptyArray<number>'])
    assert.deepEqual(T.decode([1]), right(new NonEmptyArray(1, [])))
    assert.deepEqual(T.decode([1, 2, 3]), right(new NonEmptyArray(1, [2, 3])))

    assert.deepEqual(T.encode(new NonEmptyArray(1, [2, 3])), [1, 2, 3])
    assert.deepEqual(T.encode(new NonEmptyArray(1, [])), [1])
  })
})

describe('number', () => {
  it('NumberFromString', () => {
    const T = NumberFromString
    assert.deepEqual(T.decode('0'), right(0))
    assert.deepEqual(T.decode('10'), right(10))
    assert.deepEqual(T.decode('-1'), right(-1))
    assert.deepEqual(T.decode('11'), right(11))
    assert.deepEqual(T.decode('5.5'), right(5.5))
    assert.deepEqual(T.decode('-5.5'), right(-5.5))
  })

  it('IntegerFromString', () => {
    const T = IntegerFromString
    assert.deepEqual(T.decode('0'), right(0))
    assert.deepEqual(T.decode('10'), right(10))
    assert.deepEqual(T.decode('-1'), right(-1))
    assert.deepEqual(T.decode('11'), right(11))
    assert.deepEqual(PathReporter.report(T.decode('5.5')), ['Invalid value 5.5 supplied to : IntegerFromString'])
    assert.deepEqual(PathReporter.report(T.decode('-5.5')), ['Invalid value -5.5 supplied to : IntegerFromString'])
  })
})

describe('Date', () => {
  it('DateFromISOString', () => {
    const T = DateFromISOString
    const d = new Date(1973, 10, 30)
    const s = d.toISOString()
    assert.deepEqual(T.decode(s), right(d))
    assert.deepEqual(T.decode(s).map(d => d.getTime()), right(d.getTime()))
    assert.deepEqual(PathReporter.report(T.decode('foo')), ['Invalid value "foo" supplied to : DateFromISOString'])
  })

  it('DateFromNumber', () => {
    const T = DateFromNumber
    const d = new Date(1973, 10, 30)
    const millis = d.getTime()
    assert.deepEqual(T.decode(millis), right(d))
    assert.deepEqual(T.decode(millis).map(d => d.getTime()), right(millis))
    assert.deepEqual(PathReporter.report(T.decode(NaN)), ['Invalid value null supplied to : DateFromNumber'])
  })

  it('DateFromUnixTime', () => {
    const T = DateFromUnixTime
    const getSeconds = (d: Date): number => d.getTime() / 1000
    const d = new Date(1973, 10, 30)
    const seconds = getSeconds(d)
    assert.deepEqual(T.decode(seconds), right(d))
    assert.deepEqual(T.decode(seconds).map(getSeconds), right(seconds))
    assert.deepEqual(PathReporter.report(T.decode(NaN)), ['Invalid value null supplied to : DateFromUnixTime'])
  })
})

describe('monocle-ts', () => {
  it('lensesFromProps', () => {
    const T1 = t.type({
      name: t.string,
      age: t.number
    })
    const lenses1 = lensesFromProps(T1.props)
    assert.strictEqual(lenses1.age.get({ name: 'Giulio', age: 43 }), 43)

    const T2 = t.strict({
      name: t.string,
      age: t.number
    })
    const lenses2 = lensesFromProps(T2.props)
    assert.strictEqual(lenses2.age.get({ name: 'Giulio', age: 43 }), 43)
  })

  it('lensesFromInterface', () => {
    const T1 = t.type({
      name: t.string,
      age: t.number
    })
    const lenses1 = lensesFromInterface(T1)
    assert.strictEqual(lenses1.age.get({ name: 'Giulio', age: 43 }), 43)

    const T2 = t.strict({
      name: t.string,
      age: t.number
    })
    const lenses2 = lensesFromInterface(T2)
    assert.strictEqual(lenses2.age.get({ name: 'Giulio', age: 43 }), 43)
  })
})

describe('newtype-ts', () => {
  it('fromNewtype', () => {
    type Age = Newtype<'Age', number>
    const isoAge = iso<Age>()
    const T = fromNewtype<Age>(t.number)
    const res: Validation<Age> = T.decode(42)
    assert.deepEqual(res, right(42))
    const e: number = T.encode(isoAge.wrap(42))
    assert.strictEqual(e, 42)
  })
})

describe('JSON', () => {
  it('JSONTypeRT', () => {
    const T = JSONTypeRT
    assert.deepEqual(T.decode({}), right({}))
    assert.deepEqual(T.decode([]), right([]))
    assert.deepEqual(T.decode('s'), right('s'))
    assert.deepEqual(T.decode(1), right(1))
    assert.deepEqual(T.decode(true), right(true))
    assert.deepEqual(T.decode(null), right(null))
    assert.deepEqual(T.decode({ name: 'Giulio' }), right({ name: 'Giulio' }))
    assert.strictEqual(JSONTypeRT.is([{ a: [true] }]), true)
  })

  it('JSONFromString', () => {
    const T = JSONFromString
    assert.deepEqual(T.decode('{}'), right({}))
    assert.deepEqual(T.decode('[]'), right([]))
    assert.deepEqual(T.decode('"s"'), right('s'))
    assert.deepEqual(T.decode('1'), right(1))
    assert.deepEqual(T.decode('true'), right(true))
    assert.deepEqual(T.decode('null'), right(null))
    assert.deepEqual(T.decode('{"name":"Giulio"}'), right({ name: 'Giulio' }))
  })
})
