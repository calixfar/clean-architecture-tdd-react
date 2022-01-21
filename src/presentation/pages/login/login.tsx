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
    emailError: 'Campo obligatorio',
    passwordError: 'Campo obligatorio'
  })

  useEffect(() => {
    validation.validate({email: state.email})
  }, [state.email])

  useEffect(() => {
    validation.validate({password: state.password})
  }, [state.password])

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite su email" />
          <Input type="password" name="password" placeholder="Digite su password" />
          <button role="button" type="submit" className={Styles.submit} disabled>Entrar</button>
          <span className={Styles.link}>Crear cuenta</span>
          <FormStatus  />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
};

export default Login
