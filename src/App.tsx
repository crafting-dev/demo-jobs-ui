import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'

import { useAuth } from './contexts/authContext'
import { Routes } from './routes'
import { ProtectedRouteProps } from './models/types'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './Header'
import Footer from './Footer'

const App = (): JSX.Element => {
  const [auth, setAuth] = useAuth()

  const setRedirectPath = (path: string): void => {
    setAuth({ ...auth, redirectPath: path })
  }

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: !!auth.isAuthenticated,
    redirectPath: auth.redirectPath,
    setRedirectPath,
  }

  const Page = (): JSX.Element => {
    return (
      <Switch>
        {Routes.map((route) => {
          if (route.private) {
            return (
              <ProtectedRoute
                {...defaultProtectedRouteProps}
                path={route.path}
                key={route.path}
              >
                <route.page />
              </ProtectedRoute>
            )
          }

          return (
            <Route exact path={route.path} key={route.path}>
              <route.page />
            </Route>
          )
        })}

        <Redirect from="*" to="/" />
      </Switch>
    )
  }

  return (
    <div>
      <CssBaseline />

      <Header />

      <Page />

      <Footer />
    </div>
  )
}

export default App
