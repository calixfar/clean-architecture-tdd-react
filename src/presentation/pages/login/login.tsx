import React from 'react'
import { Footer, LoginHeader, Spinner } from '@/presentation/components'
import Styles from './login-styles.scss'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <form className={Styles.form}>
        <h2>Login</h2>
        <div className={Styles.inputWrap}>
          <input type="email" placeholder="Digite su e-mail" />
          <span className={Styles.status}>🔴</span>
        </div>
        <div className={Styles.inputWrap}>
          <input type="password" placeholder="Digite su contraseña" />
          <span className={Styles.status}>🔴</span>
        </div>
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
