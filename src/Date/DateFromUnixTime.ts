import * as t from 'io-ts'

export class DateFromUnixTimeType extends t.Type<Date, number, t.mixed> {
  readonly _tag: 'DateFromUnixTimeType' = 'DateFromUnixTimeType'
  constructor() {
    super(
      'DateFromUnixTime',
      (u): u is Date => u instanceof Date,
      (u, c) => {
        const validation = t.Integer.validate(u, c)
        if (validation.isLeft()) {
          return validation as any
        } else {
          return t.success(new Date(validation.value * 1000))
        }
      },
      a => a.getTime() / 1000
    )
  }
}

export interface DateFromUnixTimeC extends DateFromUnixTimeType {}

export const DateFromUnixTime: DateFromUnixTimeC = new DateFromUnixTimeType()
