import { Iso } from 'monocle-ts'

export const MillisecondSecondIso = new Iso<number, number>(s => s / 1000, a => a * 1000)
