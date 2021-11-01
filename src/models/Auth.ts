type Auth = {
  token?: string
  id?: number
  bearerId?: number
  name?: string
  email?: string
  type?: string
  avatarUrl?: string
  isAuthenticated?: boolean
  redirectPath: string
}

const unauthenticated: Auth = {
  redirectPath: '',
}

const baseUrl = 'http://localhost:3001/api/v1'

export default Auth
export { unauthenticated, baseUrl }
