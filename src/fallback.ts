import * as t from 'io-ts'

export const fallback = <A, O, I>(codec: t.Type<A, O, I>) => (
  a: A,
  name = `fallback(${codec.name})`
): t.Type<A, O, I> => {
  const isFallbackValid = codec.is(a)
  return new t.Type<A, O, I>(
    name,
    codec.is,
    (i, context) => {
      const validation = codec.validate(i, context)
      return validation.isLeft() && isFallbackValid ? t.success(a) : validation
    },
    codec.encode
  )
}
