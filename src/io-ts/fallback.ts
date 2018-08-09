import * as t from 'io-ts'

export const fallback = <A, O, I>(type: t.Type<A, O, I>) => (a: A, name = `fallback(${type.name})`) => {
  const isFallbackValid = type.is(a)
  return new t.Type<A, O, I>(
    name,
    type.is,
    (i, context) => {
      const validation = type.validate(i, context)
      return validation.isLeft() && isFallbackValid ? t.success(a) : validation
    },
    type.encode
  )
}
