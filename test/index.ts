import * as assert from 'assert'
import * as t from 'io-ts'
import { PathReporter } from 'io-ts/lib/PathReporter'
import { iso } from 'newtype-ts'
import { prismNonZero, NonZero } from 'newtype-ts/lib/NonZero'

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
  createSetFromArray,
  createStrMapFromDictionary,
  fromNewtype,
  fromRefinement,
  lensesFromProps,
  lensesFromInterface,
  mapOutput,
  fromNewtypeCurried,
  uuid
} from '../src'
import { left, right } from 'fp-ts/lib/Either'
import { none, some } from 'fp-ts/lib/Option'

import { Newtype } from 'newtype-ts'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { ordNumber } from 'fp-ts/lib/Ord'
import { StrMap } from 'fp-ts/lib/StrMap'

describe('mapOutput', () => {
  it('should map the output of encode', () => {
    const toUndefined = <A>(x: A | null): A | undefined => (x === null ? undefined : x)
    const Input = createOptionFromNullable(t.number)
    const Output = mapOutput(Input, toUndefined)
    assert.strictEqual(Output.encode(none), undefined)
    assert.strictEqual(Output.encode(some(1)), 1)
  })
})

describe('fp-ts', () => {
  it('createOptionFromNullable', () => {
    const T1 = createOptionFromNullable(t.number)
    assert.deepEqual(T1.decode(null), right(none))
    assert.deepEqual(T1.decode(undefined), right(none))
    assert.deepEqual(T1.decode(1), right(some(1)))
    assert.deepEqual(T1.encode(some(1)), 1)
    assert.deepEqual(T1.encode(none), null)
    assert.strictEqual(T1.is(some(1)), true)
    assert.strictEqual(T1.is(some('foo')), false)

    const T2 = createOptionFromNullable(NumberFromString)
    assert.deepEqual(T2.decode(null), right(none))
    assert.deepEqual(T2.decode('1'), right(some(1)))
    assert.deepEqual(T2.encode(none), null)
    assert.deepEqual(T2.encode(some(1)), '1')
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

    assert.strictEqual(T.is(new NonEmptyArray(1, [2, 3])), true)
    assert.strictEqual(T.is(null), false)
    assert.strictEqual(T.is(new NonEmptyArray('a', ['b', 'c'])), false)
  })

  it('createSetFromArray', () => {
    const T = createSetFromArray(t.number, ordNumber)
    assert.deepEqual(T.is(null), false)
    assert.deepEqual(T.is(new Set()), true)
    assert.deepEqual(T.is(new Set([])), true)
    assert.deepEqual(T.is(new Set([1])), true)
    assert.deepEqual(new Set([1, 1]), new Set([1]))
    assert.deepEqual(T.is(new Set([1, 1])), true)
    assert.deepEqual(T.is(new Set([1, 2])), true)
    assert.deepEqual(T.is(new Set([1, '1'])), false)

    assert.deepEqual(PathReporter.report(T.decode(null)), ['Invalid value null supplied to : Set<number>'])
    assert.deepEqual(PathReporter.report(T.decode([1, 1])), ['Invalid value [1,1] supplied to : Set<number>'])

    assert.deepEqual(T.decode([]), right(new Set()))
    assert.deepEqual(T.decode([1]), right(new Set([1])))
    assert.deepEqual(T.decode([1, 2, 3]), right(new Set([1, 2, 3])))

    assert.deepEqual(T.encode(new Set([1, 2, 3])), [1, 2, 3])
    assert.deepEqual(T.encode(new Set([1])), [1])
    assert.deepEqual(T.encode(new Set([])), [])
    assert.deepEqual(T.encode(new Set()), [])
  })

  it('createStrMapFromDictionary', () => {
    const T = createStrMapFromDictionary(t.number)

    assert.deepEqual(T.decode({}), right(new StrMap({})))
    assert.deepEqual(T.decode({ foo: 42 }), right(new StrMap({ foo: 42 })))
    assert.deepEqual(PathReporter.report(T.decode({ foo: 'not a number' })), [
      'Invalid value "not a number" supplied to : StrMap<number>/foo: number'
    ])
    assert.deepEqual(T.encode(new StrMap({})), {})
    assert.deepEqual(T.encode(new StrMap({ foo: 42 })), { foo: 42 })
    assert.strictEqual(T.is(new StrMap({ foo: 42 })), true)
    assert.strictEqual(T.is(new StrMap({ foo: 'not a number' })), false)
    assert.strictEqual(T.is('not a strmap'), false)
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
    assert.deepEqual(PathReporter.report(T.decode('a')), ['Invalid value "a" supplied to : NumberFromString'])
    assert.deepEqual(PathReporter.report(T.decode('2a')), ['Invalid value "2a" supplied to : NumberFromString'])
    assert.deepEqual(PathReporter.report(T.decode('2.a')), ['Invalid value "2.a" supplied to : NumberFromString'])
  })

  it('IntegerFromString', () => {
    const T = IntegerFromString
    assert.deepEqual(T.decode('0'), right(0))
    assert.deepEqual(T.decode('10'), right(10))
    assert.deepEqual(T.decode('-1'), right(-1))
    assert.deepEqual(T.decode('11'), right(11))
    assert.deepEqual(PathReporter.report(T.decode('5.5')), ['Invalid value 5.5 supplied to : IntegerFromString'])
    assert.deepEqual(PathReporter.report(T.decode('-5.5')), ['Invalid value -5.5 supplied to : IntegerFromString'])
    assert.deepEqual(PathReporter.report(T.decode('a')), ['Invalid value "a" supplied to : IntegerFromString'])
    assert.deepEqual(PathReporter.report(T.decode('a5')), ['Invalid value "a5" supplied to : IntegerFromString'])
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
    interface Age extends Newtype<'Age', number> {}
    const isoAge = iso<Age>()
    const T = fromNewtype<Age>(t.number)
    assert.deepEqual(T.decode(42), right(42))
    assert.strictEqual(T.encode(isoAge.wrap(42)), 42)
  })

  it('fromNewtypeCurried', () => {
    interface Id extends Newtype<'Id', string> {}

    const Id = fromNewtype<Id>(t.string)
    const isoId = iso<Id>()

    interface User {
      id: Id
      name: string
    }

    const User = t.interface({
      id: Id,
      name: t.string
    })

    interface SpecialUser extends Newtype<'SpecialUser', User> {}

    const isoSpecialUser = iso<SpecialUser>()

    const T = fromNewtypeCurried<SpecialUser>()(User)
    assert.deepEqual(T.decode({ id: 'abc', name: 'name' }), right({ id: 'abc', name: 'name' }))
    assert.deepEqual(T.encode(isoSpecialUser.wrap({ id: isoId.wrap('abc'), name: 'name' })), {
      id: 'abc',
      name: 'name'
    })
  })

  it('fromRefinement', () => {
    const T = fromRefinement<NonZero>()(t.number, prismNonZero, 'NonZero')
    assert.deepEqual(T.decode(1), right(1))
    assert.deepEqual(PathReporter.report(T.decode('a')), ['Invalid value "a" supplied to : NonZero'])
    assert.deepEqual(PathReporter.report(T.decode(0)), ['Invalid value 0 supplied to : NonZero'])
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

it('UUID', () => {
  assert.deepEqual(uuid.decode('6e9c5587-a342-4b63-a901-87b31fa2ffa3'), right('6e9c5587-a342-4b63-a901-87b31fa2ffa3'))
  assert.deepEqual(PathReporter.report(uuid.decode('invalid')), ['Invalid value "invalid" supplied to : UUID'])
})
