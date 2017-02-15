import { SIGNIN, SIGNOUT, SIGNIN_ERROR } from '../actions/signIn'

export default (state = { isSignedIn: true }, action) => {
  console.log(action)
  switch (action.type) {
    case SIGNIN:
      return { ...state, isSignedIn: true, errorMessage: null };
    case SIGNOUT:
      return { ...state, isSignedIn: false };
    case SIGNIN_ERROR:
      return { isSignedIn: false, errorMessage: action.payload}
    default:
      return state;
  }
}