import React from 'react'
import { RouteProps } from 'react-router-dom'

export type ProtectedRouteProps = {
  isAuthenticated: boolean
  redirectPath: string
  setRedirectPath: (path: string) => void
} & RouteProps

export interface Route {
  path: string
  page: React.FunctionComponent
  protected: boolean
}
