import { switchLoader } from './loader'
import { updateUser } from './user'
import { purge } from '../store/index'
import { POST } from '../utils/ifetch'

export const SIGNOUT = 'SIGNOUT'
export const SIGNIN_ERROR = 'SIGNIN_ERROR'

export const toSignIn = ({username, password}) => async (dispatch) => {
  try {
    dispatch(switchLoader(true))
    let user = await POST('/user/session', { username, password })
    dispatch(updateUser(user))
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
  dispatch(updateUser({}))
  dispatch(signInWithError())
}