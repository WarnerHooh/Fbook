import { switchLoader } from './loader'
import { setUser } from './user'
import { purge } from '../store'
import { POST } from '../utils/ifetch'

export const SIGNOUT = 'SIGNOUT'
export const SIGNIN_ERROR = 'SIGNIN_ERROR'

export const toSignIn = ({username, password}) => async (dispatch) => {
  try {
    dispatch(switchLoader(true))
    let user = await POST('/user/session', { username, password })
    dispatch(setUser(user))
  } catch (e) {
    dispatch(signInWithError(e))
  } finally {
    dispatch(switchLoader(false))
  }
}

const signInWithError = (error) => ({
  type: SIGNIN_ERROR,
  payload: error && `${error}`
})

export const toSignOut = () => (dispatch)=> {
  purge()
  dispatch(setUser({}))
  dispatch(signInWithError())
}