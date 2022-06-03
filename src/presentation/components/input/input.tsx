import React, { memo, useContext } from 'react'
import Styles from './input-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & Required<{name: string}>

const Input: React.FC<Props> = (props) => {
  const { state, setState } = useContext(Context)
  const error = state[`${props.name}Error`]
  const status = error ? '🔴' : '🟢'
  const title = error || 'Correcto'

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setState({
      ...state,
      [target.name]: target.value
    })
  }

  return (
    <div className={Styles.inputWrap}>
      <input data-testid={props.name} autoComplete="off" {...props} onChange={handleChange} />
      <span data-testid={`${props.name}-status`} title={title} className={Styles.status}>{status}</span>
    </div>
  )
}

export default memo(Input)
