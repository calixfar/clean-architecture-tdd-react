import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import Login from './login'
import { ValidationSpy } from '@/presentation/test'

type SutTypes = {
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  render(<Login validation={validationSpy} />)

  return {
    validationSpy
  }
}

describe('Login', () => {
  test('should start with initial state', () => {
    makeSut()
    const errorWrap = screen.getByRole('status')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = screen.getByRole('button') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatusInput = screen.getByTestId('email-status')
    expect(emailStatusInput.title).toBe('Campo obligatorio')
    expect(emailStatusInput.textContent).toBe('🔴')
    const passwordStatusInput = screen.getByTestId('password-status')
    expect(passwordStatusInput.title).toBe('Campo obligatorio')
    expect(passwordStatusInput.textContent).toBe('🔴')
  })

  test('should call Validation with correct email', () => {
    const { validationSpy } = makeSut()  
    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    expect(validationSpy.fieldName).toEqual('email')
    expect(validationSpy.fieldValue).toEqual('any_email')
  })

  test('should call Validation with correct password', () => {
    const { validationSpy } = makeSut()  
    const passwordInput = screen.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: 'any_password' } })
    expect(validationSpy.fieldName).toEqual('password')
    expect(validationSpy.fieldValue).toEqual('any_password')
  })
})
