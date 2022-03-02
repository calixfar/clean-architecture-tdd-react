import { FieldValidationSpy } from '@/validation/test'
import { ValidationComposite } from './validation-composite'
import faker from 'faker'

type SutTypes = {
  sut
  fieldvalidationsSpy
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldvalidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]
  const sut = ValidationComposite.build(fieldvalidationsSpy)

  return {
    sut,
    fieldvalidationsSpy
  }
}

describe('ValidationComposite', () => {
  test('Should returns error if any validation fails', () => {
    const fieldName = faker.database.column()
    const { sut, fieldvalidationsSpy } = makeSut(fieldName)
    const errorMessage = faker.random.words()
    fieldvalidationsSpy[0].error = new Error(errorMessage)
    fieldvalidationsSpy[1].error = new Error(faker.random.words())

    const error = sut.validate(fieldName, faker.random.words())
    expect(error).toBe(errorMessage)
  })
  test('Should returns error if any validation fails', () => {
    const fieldName = faker.database.column()
    const { sut } = makeSut(fieldName)

    const error = sut.validate(fieldName, faker.random.words())
    expect(error).toBeFalsy()
  })
})
