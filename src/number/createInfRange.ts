import * as t from 'io-ts'

export function createInfRange<T extends t.Type<number>>(type: T, from: number, to: number, name?: string): t.RefinementType<T> {
  return t.refinement(type, n => n > from && n <= to, name || `Range(${from}, ${to}]`)
}
