import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import Login from './login'
import { ValidationSpy } from '@/presentation/test'
import faker from 'faker'

type SutTypes = {
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const errorMessage = faker.random.words()
  validationSpy.errorMessage = errorMessage

  render(<Login validation={validationSpy} />)

  return {
    validationSpy
  }
}

describe('Login', () => {
  test('should start with initial state', () => {
    const { validationSpy } = makeSut()
    const errorWrap = screen.getByRole('status')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = screen.getByRole('button') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatusInput = screen.getByTestId('email-status')
    expect(emailStatusInput.title).toBe(validationSpy.errorMessage)
    expect(emailStatusInput.textContent).toBe('🔴')
    const passwordStatusInput = screen.getByTestId('password-status')
    expect(passwordStatusInput.title).toBe('Campo obligatorio')
    expect(passwordStatusInput.textContent).toBe('🔴')
  })

  test('should call Validation with correct email', () => {
    const { validationSpy } = makeSut()  
    const emailInput = screen.getByTestId('email')
    const email = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: email }})
    expect(validationSpy.fieldName).toEqual('email')
    expect(validationSpy.fieldValue).toEqual(email)
  })

  test('should call Validation with correct password', () => {
    const { validationSpy } = makeSut()  
    const passwordInput = screen.getByTestId('password')
    const password = faker.internet.password()
    fireEvent.input(passwordInput, { target: { value: password }})
    expect(validationSpy.fieldName).toEqual('password')
    expect(validationSpy.fieldValue).toEqual(password)
  })

  test('should show email error if Validation fails', () => {
    const { validationSpy } = makeSut()  
    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() }})
    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })
})
