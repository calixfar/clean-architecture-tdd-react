import React from 'react'
import { screen, render } from '@testing-library/react'
import Login from './login'

describe('Login', () => {
  test('should first', () => {
    render(<Login/>)
    const button = screen.getByRole('status')
    expect(button.childElementCount).toBe(0)
  })
  
})
