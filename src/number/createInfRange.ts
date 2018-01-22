import * as t from 'io-ts'

export function createInfRange<T extends t.Type<t.mixed, number>>(
  type: T,
  from: number,
  to: number,
  name?: string
): t.RefinementType<T, t.mixed, number> {
  return t.refinement(type, n => n > from && n <= to, name || `Range(${from}, ${to}]`)
}
