import * as F from 'fp-ts'
import * as D from 'io-ts/Decoder'
import * as assert from 'assert'
import { drawFirstLine, flatObject, flatObjects } from '../src/flatObjects'

describe('flatObjects', () => {
  const validateObject = flatObject(drawFirstLine)({
    name: D.withMessage(() => 'name must be string')(D.string),
    age: D.withMessage(() => 'age must be number')(D.number),
  })

  it('flatObject', () => {
    const error = F.pipeable.pipe(
      {
        name: 'jit',
        age: '140',
      },
      validateObject
    )

    assert.deepStrictEqual(error, {
      name: undefined,
      age: 'age must be number',
    })
  })
  it('flatObjects', () => {
    const validateObjects = flatObjects(validateObject)
    const error = F.pipeable.pipe(
      [
        {
          name: 'jit',
          age: '140',
        },
        {
          name: 1,
          age: '24',
        },
      ],
      validateObjects
    )
    assert.deepStrictEqual(error, [
      {
        name: undefined,
        age: 'age must be number',
      },
      {
        name: 'name must be string',
        age: 'age must be number',
      },
    ])
  })
})
