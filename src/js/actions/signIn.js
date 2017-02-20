import { saveToLocalState, clearLocalState } from '../utils/localStorage'
import { updateUser } from './user'

export const SIGNEDIN = 'SIGNEDIN'
export const SIGNING = 'SIGNING'
export const SIGNOUT = 'SIGNOUT'
export const SIGNIN_ERROR = 'SIGNIN_ERROR'

export const toSignIn = ({username, password}) => {
  return async (dispatch) => {
    try {
      dispatch(signing());
      // let response = await fetch('http://10.17.5.55:3000/user/session', {
        let response = await fetch('http://45.78.48.184:3000/user/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      let json = await response.json()
      if(response.ok) {
        saveToLocalState({user: json});

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
    type: SIGNEDIN
  }
}

const signing = () => ({
  type: SIGNING
})

const signInWithError = (error) => {
  return {
    type: SIGNIN_ERROR,
    payload: `Login failed: ${error}`
  }
}

export const toSignOut = () => (dispatch)=> {
  clearLocalState({dispatch});
  dispatch({type: SIGNOUT});
}