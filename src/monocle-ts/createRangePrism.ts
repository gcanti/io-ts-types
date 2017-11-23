import { Prism } from 'monocle-ts'

export const createRangePrism = (from: number, to: number): Prism<number, number> => {
  return Prism.fromPredicate<number>(n => n >= from && n <= to)
}
