import { updateUser } from './user'
import { signedIn } from './signIn'

export const SIGNUP = 'SIGNUP'
export const SIGNUP_ERROR = 'SIGNUP_ERROR'

export const toSignUp = ({username, email, password}) => {
  return async (dispatch) => {
    if(username === 'a' && password === 'a') {
      try {
        let response = await fetch('https://api.github.com/users/warnerhooh')
        let json = await response.json()
        dispatch(updateUser(json))
        dispatch(signedIn())
        dispatch(signedUp())
      } catch (e) {
        console.log(e);
      }
    } else {
      dispatch(signUpWithError())
    }
  }
}

const signedUp = () => {
  return {
    type: SIGNUP
  }
}

const signUpWithError = () => {
  return {
    type: SIGNUP_ERROR,
    payload: 'Sign up failed:'
  }
}
