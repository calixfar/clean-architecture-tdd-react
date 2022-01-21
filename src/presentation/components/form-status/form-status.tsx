import React from 'react'
import { Spinner } from '..'
import Styles from './form-status.scss'

const FormStatus = () => {
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
        <Spinner className={Styles.spinner} />
        <span data-testid="main-error" className={Styles.error}>Error</span>
    </div>
  )
};

export default FormStatus
