import React, { useState } from 'react'
import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import Styles from './login-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

type StateProps = {
  isLoading: boolean
  errorMessage: string
}

const Login: React.FC = () => {

  const [state] = useState<StateProps>({
    isLoading: false,
    errorMessage: ''
  })

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={state}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite su email" />
          <Input type="password" name="password" placeholder="Digite su password" />
          <button role="button" type="submit" className={Styles.submit}>Entrar</button>
          <span className={Styles.link}>Crear cuenta</span>
          <FormStatus  />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
};

export default Login
