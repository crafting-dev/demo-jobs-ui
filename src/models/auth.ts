import { Auth } from './types'

const createBaseUrl = (): string => {
  const locationToMatchRegex = new RegExp(
    '^https://[a-zA-Z0-9-]*.sandboxes.run'
  )

  if (
    window.location.protocol === 'https:' ||
    locationToMatchRegex.test(window.location.origin)
  ) {
    return window.location.origin
  }

  return 'http://localhost:3001'
}

export const baseUrl = createBaseUrl()

export const unauthenticated: Auth = {
  redirectPath: '',
}
