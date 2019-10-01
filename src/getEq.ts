import * as t from 'io-ts'
import { getEq as getArrayEq } from 'fp-ts/lib/Array'
import { getEq as getRecordEq, record } from 'fp-ts/lib/Record'
import { eqString, eqNumber, getStructEq, Eq, eqBoolean, fromEquals, strictEqual, getTupleEq } from 'fp-ts/lib/Eq'

interface ArrayType extends t.ArrayType<HasEq> {}
interface RecordType extends t.DictionaryType<t.StringType, HasEq> {}
interface StructType extends t.InterfaceType<Record<string, t.TypeOf<HasEq>>> {}
interface ExactType extends t.ExactType<HasEq> {}
interface TupleType extends t.TupleType<Array<HasEq>> {}
interface PartialType extends t.PartialType<Record<string, HasEq>> {}
interface UnionType extends t.UnionType<Array<HasEq>> {}
interface IntersectionType extends t.IntersectionType<Array<HasEq>> {}
interface BrandedType extends t.RefinementType<HasEq> {}

/**
 * @since 0.6.0
 */
export type HasEq =
  | t.UnknownType
  | t.UndefinedType
  | t.NullType
  | t.VoidType
  | t.StringType
  | t.NumberType
  | t.BooleanType
  | t.KeyofType<Record<string, unknown>>
  | t.LiteralType<any>
  | ArrayType
  | RecordType
  | StructType
  | ExactType
  | TupleType
  | PartialType
  | UnionType
  | IntersectionType
  | BrandedType

function getProps(codec: t.InterfaceType<any> | t.ExactType<any> | t.PartialType<any>): t.Props {
  switch (codec._tag) {
    case 'InterfaceType':
    case 'PartialType':
      return codec.props
    case 'ExactType':
      return getProps(codec.type)
  }
}

/**
 * Returns an `Eq` instance for the provided io-ts codec.
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
 * @since 0.6.0
 */
export function getEq<T extends HasEq>(codec: T): Eq<t.TypeOf<T>> {
  const c: HasEq = codec as any
  switch (c._tag) {
    case 'UnknownType':
    case 'UndefinedType':
    case 'NullType':
    case 'VoidType':
    case 'LiteralType':
      return fromEquals(strictEqual)
    case 'StringType':
    case 'KeyofType':
      return eqString as any
    case 'NumberType':
      return eqNumber as any
    case 'BooleanType':
      return eqBoolean as any
    case 'ArrayType':
      return getArrayEq(getEq(c.type)) as any
    case 'DictionaryType':
      return getRecordEq(getEq(c.codomain)) as any
    case 'ExactType':
    case 'InterfaceType':
    case 'PartialType':
      return getStructEq(record.map(getProps(c), getEq as any) as any)
    case 'TupleType':
      return getTupleEq(...c.types.map(getEq)) as any
    case 'UnionType':
      return fromEquals((a, b) => c.types.map(getEq).some(eq => eq.equals(a, b)))
    case 'IntersectionType':
      return fromEquals((a, b) => c.types.map(getEq).every(eq => eq.equals(a, b)))
    case 'RefinementType':
      return getEq(c.type)
  }
}
