import { updateUser } from './user'

export const SIGNIN = 'SIGNIN'
export const SIGNOUT = 'SIGNOUT'
export const SIGNIN_ERROR = 'SIGNIN_ERROR'

export const toSignIn = ({username, password}) => {
  return async (dispatch) => {
    try {
      let response = await fetch('http://45.78.48.184:3000/user/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      let json = await response.json()
      if(response.ok) {
        dispatch(updateUser(json))
        dispatch(signedIn())
      } else {
        dispatch(signInWithError(json.message))
      }
    } catch (e) {
      dispatch(signInWithError(e))
    }
  }
}

export const signedIn = () => {
  return {
    type: SIGNIN
  }
}

const signInWithError = (error) => {
  return {
    type: SIGNIN_ERROR,
    payload: `Login failed: ${error}`
  }
}

export const toSignOut = () => {
  return {
    type: SIGNOUT
  }
}