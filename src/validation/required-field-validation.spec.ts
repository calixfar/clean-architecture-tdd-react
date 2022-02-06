import { RequiredFieldError } from "./errors/required-field-error"
import { RequiredFieldValidation } from "./required-field-validation"
import faker, { fake } from 'faker'

describe('RequiredFieldValidation', () => {
  test('should returns error if field is empty', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })

  test('should return falsy error if field is not empty', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate(faker.random.word())
    expect(error).toBeFalsy()
  })
})
