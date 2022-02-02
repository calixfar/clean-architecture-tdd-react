import React, { useEffect, useState } from 'react'
import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import Styles from './login-styles.scss'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation';

interface Props {
  validation: Validation
}

const Login: React.FC<Props> = ({ validation }) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    isLoading: false,
    mainError: '',
    emailError: '',
    passwordError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    })
  }, [state.email, state.password])

  const disabledButton = !!state.emailError || !!state.passwordError

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setState({
      ...state,
      isLoading: true
    })
  }
 
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite su email" />
          <Input type="password" name="password" placeholder="Digite su password" />
          <button role="button" type="submit" className={Styles.submit} disabled={disabledButton}>Entrar</button>
          <span className={Styles.link}>Crear cuenta</span>
          <FormStatus  />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
};

export default Login
