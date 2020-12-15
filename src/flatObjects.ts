import * as D from 'io-ts/lib/Decoder'
import * as F from 'fp-ts'

type Schema = Record<string, D.Decoder<any, string | number | null | undefined | boolean | bigint>>
/**
 * Decode "flat object"(whose values are not reference type),
 * unlike `t.type`, the return is `Record<string, string>`.
 * One use case is validating JSON from excel, and using the
 * returned error report to display table like UI.
 * @since 0.1.22
 * @example
 *   const validateObject = flatObject(drawFirstLine)({
 *      name: D.withMessage(() => 'name must be string')(D.string),
 *      age: D.withMessage(() => 'age must be number')(D.number),
 *   })
 *   const error = F.pipeable.pipe(
 *     {
 *       name: 'jit',
 *       age: '140',
 *     },
 *     validateObject
 *   )
 *
 *   assert.deepStrictEqual(error, {
 *     name: undefined,
 *     age: 'age must be number',
 *   })
 * */
export const flatObject = <S extends Schema>(toMessage: (de: D.DecodeError) => string) => (schema: S) => (
  input: object
): { [K in keyof S]: string | undefined } => {
  return F.pipeable.pipe(
    schema,
    F.record.mapWithIndex((k) =>
      F.pipeable.pipe(
        schema[k].decode((input as any)[k]),
        F.either.fold(toMessage, () => undefined)
      )
    )
  ) as any
}

/**
 * @since 0.1.22
 * */
export type ValidateFlatObject<S extends Schema> = (input: object) => { [K in keyof S]: string | undefined }

/**
 * @since 0.1.22
 * @example
 *   const validateObject = flatObject(drawFirstLine)({
 *      name: D.withMessage(() => 'name must be string')(D.string),
 *      age: D.withMessage(() => 'age must be number')(D.number),
 *   })
 *   const validateObjects = flatObjects(validateObject)
 *   const error = F.pipeable.pipe(
 *     [
 *       {
 *         name: 'jit',
 *         age: '140',
 *       },
 *       {
 *         name: 1,
 *         age: '24',
 *       },
 *     ],
 *     validateObjects
 *   )
 *   assert.deepStrictEqual(error, [
 *     {
 *       name: undefined,
 *       age: 'age must be number',
 *     },
 *     {
 *       name: 'name must be string',
 *       age: 'age must be number',
 *     },
 *   ])
 * })
 * */
export const flatObjects = <S extends Schema>(validate: ValidateFlatObject<S>) => (
  input: object[]
): Array<{ [K in keyof S]: string | undefined }> => {
  return input.map(validate)
}

export const drawFirstLine = (de: D.DecodeError) => {
  return D.draw(de).split('\n')[0]
}
