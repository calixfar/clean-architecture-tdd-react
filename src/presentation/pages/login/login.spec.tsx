import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import Login from './login'
import { ValidationStub } from '@/presentation/test'
import faker from 'faker'
import { Authentication } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'

class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params: Authentication.Params
  async auth (params: Authentication.Params): Promise<AccountModel> {
    this.params = params
    return Promise.resolve(this.account)
  };
}

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
  
  test('should call Authentication with correct values', () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email}})
    const passwordInput = screen.getByTestId('password')
    const password = faker.internet.password()
    fireEvent.input(passwordInput, { target: { value: password}})
    const submitButton = screen.getByRole('button') as HTMLButtonElement
    fireEvent.click(submitButton)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
})
