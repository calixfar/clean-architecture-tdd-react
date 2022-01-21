import React, { memo, useContext } from 'react'
import Styles from './input-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Footer: React.FC<Props> = (props) => {
  const state = useContext(Context)
  const error = state[`${props.name}Error`]
  const status = '🔴'
  const title = error

return (
    <div className={Styles.inputWrap}>
      <input autoComplete="off" {...props} />
      <span data-testid={`${props.name}-status`} title={title} className={Styles.status}>{status}</span>
    </div>
  )
}

export default memo(Footer)
