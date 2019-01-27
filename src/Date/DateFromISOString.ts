import * as t from 'io-ts'

export class DateFromISOStringType extends t.Type<Date, string, t.mixed> {
  readonly _tag: 'DateFromISOStringType' = 'DateFromISOStringType'
  constructor() {
    super(
      'DateFromISOString',
      (u): u is Date => u instanceof Date,
      (u, c) => {
        const validation = t.string.validate(u, c)
        if (validation.isLeft()) {
          return validation as any
        } else {
          const s = validation.value
          const d = new Date(s)
          return isNaN(d.getTime()) ? t.failure(s, c) : t.success(d)
        }
      },
      a => a.toISOString()
    )
  }
}

export interface DateFromISOStringC extends DateFromISOStringType {}

export const DateFromISOString: DateFromISOStringC = new DateFromISOStringType()
