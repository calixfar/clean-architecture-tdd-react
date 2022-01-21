import React from 'react'
import { screen, render } from '@testing-library/react'
import Login from './login'

describe('Login', () => {
  test('should start with initial state', () => {
    render(<Login/>)
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
})
