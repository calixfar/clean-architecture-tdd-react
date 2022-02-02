import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import Login from './login'
import { ValidationStub } from '@/presentation/test'
import faker from 'faker'

type SutTypes = {
  validationStub: ValidationStub
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError

  render(<Login validation={validationStub} />)

  return {
    validationStub
  }
}

describe('Login', () => {
  test('should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({validationError})
    const errorWrap = screen.getByRole('status')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = screen.getByRole('button') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatusInput = screen.getByTestId('email-status')
    expect(emailStatusInput.title).toBe(validationError)
    expect(emailStatusInput.textContent).toBe('🔴')
    const passwordStatusInput = screen.getByTestId('password-status')
    expect(passwordStatusInput.title).toBe(validationError)
    expect(passwordStatusInput.textContent).toBe('🔴')
  })

  test('should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({validationError})
    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() }})
    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({validationError})
    const passwordInput = screen.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() }})
    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('should show valid email state if Validation succeeds', () => {
    makeSut()
    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() }})
    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus.title).toBe('Correcto')
    expect(emailStatus.textContent).toBe('🟢')
  })
  
  test('should enable submit button if form is valid', () => {
    makeSut()
    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() }})
    const passwordInput = screen.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() }})
    const submitButton = screen.getByRole('button') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })
  
  test('should show spinner on submit', () => {
    makeSut()
    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() }})
    const passwordInput = screen.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() }})
    const submitButton = screen.getByRole('button') as HTMLButtonElement
    fireEvent.click(submitButton)
    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeDefined()
  })
})
