import React from 'react'
import { Login } from '@/presentation/pages'
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory'
import { makeLoginValidation } from '@/main/factories/validation/login-validation-factory'

export const makeLogin: React.FC = () => (
  <Login
    authentication={makeRemoteAuthentication()}
    validation={makeLoginValidation()}
  />
)