import { baseUrl } from '../models/auth'

export const GenerateToken = async (
  email: string,
  password: string
): Promise<any> => {
  const basicToken = btoa(`${email}:${password}`)

  const response = await fetch(`${baseUrl}/api/v1/authenticate`, {
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

export const RevokeToken = async (
  token: string | undefined,
  id: number | undefined
): Promise<void> => {
  await fetch(`${baseUrl}/api/v1/authenticate/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}
