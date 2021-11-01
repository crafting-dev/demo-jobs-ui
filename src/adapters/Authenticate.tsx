import { baseUrl } from '../models/Auth'

const AuthenticateToken = async (email: string, password: string) => {
  const basicToken = btoa(`${email}:${password}`)

  const response = await fetch(`${baseUrl}/authenticate`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicToken}`,
      'Content-Type': 'application/json',
    },
  })
  const data = await response.json()

  if (!response.ok) {
    const error = (data && data.message) || response.status
    return Promise.reject(error)
  }

  return data
}

const RevokeToken = async (
  token: string | undefined,
  id: number | undefined
) => {
  await fetch(`${baseUrl}/authenticate/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

export default AuthenticateToken
export { RevokeToken }
