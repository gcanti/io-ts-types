import * as t from 'io-ts'

export function createSupRange<T extends t.Type<any, number>>(
  type: T,
  from: number,
  to: number,
  name?: string
): t.RefinementType<T, any, number> {
  return t.refinement(type, n => n >= from && n < to, name || `Range[${from}, ${to})`)
}
