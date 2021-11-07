import Auth from '../models/Auth'

export const getUser = (): any => {
  const loggedInUser = sessionStorage.getItem('CRAFTING_JOBS_AUTH')
  if (loggedInUser) {
    return JSON.parse(loggedInUser)
  }
  return false
}

export const setUser = (user: Auth): void => {
  sessionStorage.setItem('CRAFTING_JOBS_AUTH', JSON.stringify(user))
}

export const deleteUser = (): void => {
  sessionStorage.removeItem('CRAFTING_JOBS_AUTH')
}
