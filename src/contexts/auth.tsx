import React, { createContext, useContext, useState } from 'react'
import { getUser } from '../adapters/store'
import { unauthenticated } from '../models/auth'
import { Auth } from '../models/types'

const authContext = createContext<[Auth, (auth: Auth) => void]>([
  unauthenticated,
  () => undefined,
])

export const useAuth = (): [Auth, (auth: Auth) => void] =>
  useContext(authContext)

export const ProvideAuth: React.FunctionComponent = (props) => {
  const [authState, setAuthState] = useState(() => {
    const loggedInUser = getUser()
    return loggedInUser || unauthenticated
  })
  const defaultAuthContext: [Auth, typeof setAuthState] = [
    authState,
    setAuthState,
  ]

  const { children } = props

  return (
    <authContext.Provider value={defaultAuthContext}>
      {children}
    </authContext.Provider>
  )
}
