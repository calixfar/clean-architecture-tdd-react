import React, { useContext } from 'react'
import { Spinner } from '..'
import Styles from './form-status.scss'
import Context from '@/presentation/contexts/form/form-context'

const FormStatus = () => {

  const { state: { isLoading, errorMessage }} = useContext(Context)

  return (
    <div role="status" className={Styles.errorWrap}>
      { isLoading && <Spinner className={Styles.spinner} /> }
      { errorMessage && <span className={Styles.error}>Error</span> }
    </div>
  )
};

export default FormStatus
