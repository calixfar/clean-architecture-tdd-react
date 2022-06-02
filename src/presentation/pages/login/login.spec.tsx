import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import 'jest-localstorage-mock'
import { screen, render, fireEvent, waitFor } from '@testing-library/react'
import { Login } from '@/presentation/pages'
import { AuthenticationSpy, ValidationStub } from '@/presentation/test'
import faker from 'faker'
import { InvalidCredentialsError } from '@/domain/errors'

type SutTypes = {
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const authenticationSpy = new AuthenticationSpy()
  render(
    <Router history={history}>
      <Login 
        validation={validationStub} 
        authentication={authenticationSpy}
      />
    </Router>
  )

  return {
    validationStub,
    authenticationSpy
  }
}

const simulateValidSubmit = async (email: string = faker.internet.email(), password: string = faker.internet.password()): Promise<void> => {
  populateEmailField(email)
  populatePasswordField(password)
  const form = screen.getByRole('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

const populateEmailField = (email: string = faker.internet.email()): void => {
  const emailInput = screen.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email}})
}

const populatePasswordField = (password: string = faker.internet.password()): void => {
  const passwordInput = screen.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password}})
}

const testStatusForField = (fieldName: string, validationError?: string): void => {
  const emailStatus = screen.getByTestId(`${fieldName}-status`)
  expect(emailStatus.title).toBe(validationError || 'Correcto')
  expect(emailStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

const testErrorWrapChildCount = (count: number): void => {
  const errorWrap = screen.getByRole('status')
  expect(errorWrap.childElementCount).toBe(count)
}

const testExistedElement = (fieldName: string): void => {
  const element = screen.getByTestId(fieldName)
  expect(element).toBeTruthy()
}

const testElementText = (fieldName: string, text: string): void => {
  const element = screen.getByTestId(fieldName)
  expect(element.textContent).toBe(text)
}

const testButtonIsDisabled = (fieldName: string, isDisabled: boolean, findByRole?: boolean): void => {
  let methodFind = 'getByTestId'
  if (findByRole) {
    methodFind = 'getByRole'
  }
  const button = screen[methodFind](fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

describe('Login', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({validationError})
    testErrorWrapChildCount(0)
    testButtonIsDisabled('button', true, true)
    testStatusForField('email', validationError)
    testStatusForField('password', validationError)
  })

  test('should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({validationError})
    populateEmailField()
    testStatusForField('email', validationError)
  })

  test('should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({validationError})
    populatePasswordField()
    testStatusForField('password', validationError)
  })

  test('should show valid email state if Validation succeeds', () => {
    makeSut()
    populateEmailField()
    testStatusForField('email')
  })

  test('should show valid password state if Validation succeeds', () => {
    makeSut()
    populatePasswordField()
    testStatusForField('password')
  })
  
  test('should enable submit button if form is valid', () => {
    makeSut()
    populateEmailField()
    populatePasswordField()
    testButtonIsDisabled('button', false, true)
  })
  
  test('should show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    testExistedElement('spinner')
  })
  
  test('should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
  
  test('should call once Authentication', async () => {
    const { authenticationSpy } = makeSut()
    await simulateValidSubmit()
    await simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(1)
  })
  
  test('should not call Authentication if form is not valid', async () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = makeSut({validationError})
    populateEmailField()
    await simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('should present error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
    await simulateValidSubmit()
    const errorWrap = screen.getByRole('status')
    await waitFor(() => errorWrap)
    testElementText('mainError', error.message)
    testErrorWrapChildCount(1)
  })

  test('should add accessToken to localStorage on success', async () => {
    const { authenticationSpy } = makeSut()
    await simulateValidSubmit()
    const form = screen.getByRole('form')
    await waitFor(() => form)
    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('should go to signup page', async () => {
    makeSut()
    await simulateValidSubmit()
    const register = screen.getByTestId('signup')
    fireEvent.click(register)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
