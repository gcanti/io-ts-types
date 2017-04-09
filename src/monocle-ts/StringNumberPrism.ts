import { Prism } from 'monocle-ts'
import { none, some } from 'fp-ts/lib/Option'

export const StringNumberPrism = new Prism<string, number>(
  s => {
    const n = parseFloat(s)
    return isNaN(n) ? none : some(n)
  },
  a => String(a)
)
