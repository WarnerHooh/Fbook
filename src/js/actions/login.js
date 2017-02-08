import { updateUser } from './user'

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

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
    }
  }
}

const logined = () => {
  return {
    type: LOGIN
  }
}

export const toLogout = () => {
  return {
    type: LOGOUT
  }
}