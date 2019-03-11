import * as t from 'io-ts'

export class RegExpType extends t.Type<RegExp, RegExp, unknown> {
  readonly _tag: 'RegExpType' = 'RegExpType'
  constructor() {
    super(
      'RegExp',
      (u): u is RegExp => Object.prototype.toString.call(u) === '[object RegExp]',
      (u, c) => (this.is(u) ? t.success(u) : t.failure(u, c)),
      t.identity
    )
  }
}

export interface RegExpC extends RegExpType {}

/**
 * @example
 * import { regexp } from 'io-ts-types/lib/regexp'
 * import { right } from 'fp-ts/lib/Either'
 *
 * const input1 = /\w+/
 * const input2 = new RegExp('\\w+')
 * assert.deepStrictEqual(regexp.decode(input1), right(input1))
 * assert.deepStrictEqual(regexp.decode(input2), right(input2))
 */
export const regexp: RegExpC = new RegExpType()
