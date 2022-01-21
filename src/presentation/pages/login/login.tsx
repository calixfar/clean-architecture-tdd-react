import React, { useState } from 'react'
import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import Styles from './login-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    mainError: '',
    emailError: 'Campo obligatorio',
    passwordError: 'Campo obligatorio'
  })

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={state}>
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
