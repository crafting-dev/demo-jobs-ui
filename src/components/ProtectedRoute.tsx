import React, { useEffect } from 'react'
import { Redirect, Route, useLocation } from 'react-router-dom'

import { ProtectedRouteProps } from '../models/types'

const ProtectedRoute = ({
  isAuthenticated,
  redirectPath,
  setRedirectPath,
  ...routeProps
}: ProtectedRouteProps): JSX.Element => {
  const currentLocation = useLocation()

  useEffect(() => {
    if (!isAuthenticated) {
      setRedirectPath(currentLocation.pathname)
    }
  }, [isAuthenticated, setRedirectPath, currentLocation])

  if (isAuthenticated) {
    return <Route {...routeProps} />
  }
  return <Redirect to={{ pathname: redirectPath }} />
}

export default ProtectedRoute
