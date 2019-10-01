import * as t from 'io-ts'
import { getEq as getArrayEq } from 'fp-ts/lib/Array'
import { getEq as getRecordEq, record } from 'fp-ts/lib/Record'
import { eqString, eqNumber, getStructEq, Eq, eqBoolean } from 'fp-ts/lib/Eq'

interface ArrayCodec extends t.ArrayType<HasEq> {}
interface RecordCodec extends t.DictionaryType<t.StringType, HasEq> {}
interface StructCodec<P extends Record<string, t.TypeOf<t.HasProps>>> extends t.InterfaceType<P> {}
interface ExactCodec extends t.ExactType<HasEq> {}

/**
 * @since 0.5.2
 */
export type HasEq =
  | t.StringType
  | t.NumberType
  | t.BooleanType
  | ArrayCodec
  | RecordCodec
  | StructCodec<any>
  | ExactCodec

function getProps(codec: t.InterfaceType<any> | t.ExactType<any>): t.Props {
  switch (codec._tag) {
    case 'InterfaceType':
      return codec.props
    case 'ExactType':
      return getProps(codec.type)
  }
}

/**
 * Return an `Eq` instance for the provided io-ts codec.
 *
 * @example
 * import * as t from 'io-ts'
 * import { getEq } from 'io-ts-types/lib/getEq'
 *
 * const Person = t.type({
 *   name: t.string,
 *   age: t.number,
 *   tags: t.array(t.string)
 * })
 *
 * const eqPerson = getEq(Person)
 * assert.strictEqual(
 *   eqPerson.equals(
 *     { name: 'John', age: 30, tags: ['a'] },
 *     { name: 'John', age: 30, tags: ['a'] }
 *   ),
 *   true
 * )
 *
 * @since 0.5.2
 */
export function getEq<T extends HasEq>(codec: T): Eq<t.TypeOf<T>> {
  const c: HasEq = codec as any
  switch (c._tag) {
    case 'StringType':
      return eqString
    case 'NumberType':
      return eqNumber
    case 'BooleanType':
      return eqBoolean
    case 'ArrayType':
      return getArrayEq(getEq(c.type))
    case 'DictionaryType':
      return getRecordEq(getEq(c.codomain))
    case 'ExactType':
    case 'InterfaceType':
      return getStructEq(record.map(getProps(c), getEq as any))
  }
}
