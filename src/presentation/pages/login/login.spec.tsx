import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import Login from './login'
import { AuthenticationSpy, ValidationStub } from '@/presentation/test'
import faker from 'faker'

type SutTypes = {
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const authenticationSpy = new AuthenticationSpy()
  render(
    <Login 
      validation={validationStub} 
      authentication={authenticationSpy}
    />
  )

  return {
    validationStub,
    authenticationSpy
  }
}

const simulateValidSubmit = (email: string = faker.internet.email(), password: string = faker.internet.password()): void => {
  populateEmailField(email)
  populatePasswordField(password)
  const submitButton = screen.getByRole('button') as HTMLButtonElement
  fireEvent.click(submitButton)
}

const populateEmailField = (email: string = faker.internet.email()): void => {
  const emailInput = screen.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email}})
}

const populatePasswordField = (password: string = faker.internet.password()): void => {
  const passwordInput = screen.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password}})
}

const simulateStatusForField = (fieldName: string, validationError?: string): void => {
  const emailStatus = screen.getByTestId(`${fieldName}-status`)
  expect(emailStatus.title).toBe(validationError || 'Correcto')
  expect(emailStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

describe('Login', () => {
  test('should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({validationError})
    const errorWrap = screen.getByRole('status')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = screen.getByRole('button') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    simulateStatusForField('email', validationError)
    simulateStatusForField('password', validationError)
  })

  test('should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({validationError})
    populateEmailField()
    simulateStatusForField('email', validationError)
  })

  test('should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({validationError})
    populatePasswordField()
    simulateStatusForField('password', validationError)
  })

  test('should show valid email state if Validation succeeds', () => {
    makeSut()
    populateEmailField()
    simulateStatusForField('email')
  })

  test('should show valid password state if Validation succeeds', () => {
    makeSut()
    populatePasswordField()
    simulateStatusForField('password')
  })
  
  test('should enable submit button if form is valid', () => {
    makeSut()
    populateEmailField()
    populatePasswordField()
    const submitButton = screen.getByRole('button') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })
  
  test('should show spinner on submit', () => {
    makeSut()
    simulateValidSubmit()
    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeDefined()
  })
  
  test('should call Authentication with correct values', () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
  
  test('should call once Authentication', () => {
    const { authenticationSpy } = makeSut()
    simulateValidSubmit()
    simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(1)
  })
  
  test('should not call Authentication if form is not valid', () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = makeSut({validationError})
    populateEmailField()
    fireEvent.submit(screen.getByRole('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })
})
