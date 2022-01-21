import React, { memo } from 'react'
import Styles from './input-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Footer: React.FC<Props> = (props) => {
return (
    <div className={Styles.inputWrap}>
      <input autoComplete="off" {...props} />
      <span className={Styles.status}>🔴</span>
    </div>
  )
}

export default memo(Footer)
