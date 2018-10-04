import * as t from 'io-ts'
import { identity } from 'fp-ts/lib/function'

export class DateType extends t.Type<Date> {
  readonly _tag: 'DateType' = 'DateType'
  constructor() {
    super(
      'Date',
      (m): m is Date => m instanceof Date,
      (m, c) => (this.is(m) ? t.success(m) : t.failure(m, c)),
      identity
    )
  }
}

export const date: DateType = new DateType()
