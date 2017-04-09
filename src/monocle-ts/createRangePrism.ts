import { Prism } from 'monocle-ts'

export function createRangePrism(from: number, to: number): Prism<number, number> {
  return Prism.fromPredicate<number>(n => n >= from && n <= to)
}
