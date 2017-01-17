export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export const toLogin = (credential) => {
  return {
    type: LOGIN,
    payload: credential
  }
}

export const toLogout = () => {
  return {
    type: LOGOUT
  }
}