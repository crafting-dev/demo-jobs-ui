import { baseUrl } from '../models/Auth'

export const Fetch = async (
  path: string,
  method: string,
  token: string | undefined
): Promise<any> => {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
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

export const Create = async (
  path: string,
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string,
  otherKey: string,
  otherValue: string,
  objType: string,
  tags: string | false
): Promise<any> => {
  const response = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      [objType]: {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        [otherKey]: otherValue,
        ...(tags && { tag_attributes: tags }),
      },
    }),
  })
  const data = await response.json()

  if (!response.ok) {
    const error = (data && data.message) || response.status
    return Promise.reject(error)
  }

  return data
}

export const Update = async (
  path: string,
  method: string,
  token: string | undefined,
  body: any
): Promise<Response> => {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    return Promise.reject(response)
  }

  return response
}
