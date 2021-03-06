import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { makeLogin } from '@/main/factories/pages/login/login-factory'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLogin} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
