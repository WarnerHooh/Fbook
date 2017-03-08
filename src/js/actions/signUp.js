import { switchLoader } from './loader'
import { POST } from '../utils/ifetch'
import { toSignIn } from './signIn'

export const SIGNUP = 'SIGNUP'
export const SIGNUP_ERROR = 'SIGNUP_ERROR'

export const toSignUp = ({username, email, password}) => {
  return async (dispatch) => {
    try {
      dispatch(switchLoader(true))
      let user = await POST('/user/register', { username, email, password })
      toSignIn({username, password})(dispatch)
    } catch (e) {
      dispatch(signUpWithError(e))
    } finally {
      dispatch(switchLoader(false))
    }
  }
}

const signUpWithError = (error) => {
  return {
    type: SIGNUP_ERROR,
    payload: error && `${error}`
  }
}
