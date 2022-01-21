import React from 'react'
import { Footer, Input, LoginHeader, Spinner } from '@/presentation/components'
import Styles from './login-styles.scss'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <form className={Styles.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite su email" />
        <Input type="password" name="password" placeholder="Digite su password" />
        <button type="submit">Entrar</button>
        <span className={Styles.link}>Crear cuenta</span>
        <div data-testid="error-wrap" className={Styles.errorWrap}>
          <Spinner className={Styles.spinner} />
          <span data-testid="main-error" className={Styles.error}>Error</span>
        </div>
      </form>
      <Footer />
    </div>
  )
};

export default Login
