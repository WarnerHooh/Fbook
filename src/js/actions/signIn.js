import { updateUser } from './user'

export const SIGNIN = 'SIGNIN'
export const SIGNOUT = 'SIGNOUT'
export const SIGNIN_ERROR = 'SIGNIN_ERROR'

export const toSignIn = ({username, password}) => {
  return async (dispatch) => {
    if(username === 'admin' && password === 'admin') {
      try {
        let response = await fetch('https://api.github.com/users/warnerhooh')
        let json = await response.json()
        dispatch(updateUser(json))
        dispatch(signedIn())
      } catch (e) {
        console.log(e);
      }
    } else {
      dispatch(signInWithError())
    }
  }
}

export const signedIn = () => {
  return {
    type: SIGNIN
  }
}

const signInWithError = () => {
  return {
    type: SIGNIN_ERROR,
    payload: 'Login failed: Invalid username or password.'
  }
}

export const toSignOut = () => {
  return {
    type: SIGNOUT
  }
}