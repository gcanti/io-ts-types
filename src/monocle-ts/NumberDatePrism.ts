import { Prism } from 'monocle-ts'
import { none, some } from 'fp-ts/lib/Option'

export const NumberDatePrism = new Prism<number, Date>(
  s => {
    const d = new Date(s)
    return isNaN(d.getTime()) ? none : some(d)
  },
  a => a.getTime()
)
