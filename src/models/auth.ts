import { Auth } from './types'

// This method is used to decide what URL to use
// for backend access in fetch() requests by the
// methods defined in src/adapters.
// Current decision tree is as follows:
// -> If window.location.origin has the format 'http://localhost:<port>'
//    Then return 'http://localhost:3001'
//    Else return window.location.origin
// Here the returned 'http://localhost:3001' is referring to the 'host:port'
// that exposes the backend API (if the dev setup is two separate endpoints
// for frontend/backend). In this case, make sure backend is actually
// available on 'localhost:3001', or modify this return to the desired port.
// Otherwise, if setup is a single endpoint with path_prefix routing all
// /api/... requests to backend, then this method will use the endpoint URL.
const createBaseUrl = (): string => {
  // Custom backend URL can be provided from environment variables
  if (process.env.BACKEND_API_URL) {
    return process.env.BACKEND_API_URL
  }

  const locationToMatchRegex = new RegExp('^http://localhost:[0-9]*')

  if (locationToMatchRegex.test(window.location.origin)) {
    return 'http://localhost:3001'
  }

  return window.location.origin
}

export const baseUrl = createBaseUrl()

export const unauthenticated: Auth = {
  redirectPath: '',
}
