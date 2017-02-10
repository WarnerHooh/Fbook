import { updateUser } from './user'

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const LOGERROR = 'LOGERROR'

export const toLogin = ({username, password}) => {
  return async (dispatch) => {
    if(username === 'admin' && password === 'admin') {
      try {
        let response = await fetch('https://api.github.com/users/warnerhooh')
        let json = await response.json()
        dispatch(updateUser(json))
        dispatch(logined())
      } catch (e) {
        console.log(e);
      }
    } else {
      dispatch(logWithError())
    }
  }
}

const logined = () => {
  return {
    type: LOGIN
  }
}

const logWithError = () => {
  return {
    type: LOGERROR,
    payload: 'Login failed: Invalid username or password.'
  }
}

export const toLogout = () => {
  return {
    type: LOGOUT
  }
}