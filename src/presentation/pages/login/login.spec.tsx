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
  })
})
