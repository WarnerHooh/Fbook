import { SIGNUP, SIGNUP_ERROR } from '../actions/signUp'

export default (state = { isSignedUp: false }, action) => {
  switch (action.type) {
    case SIGNUP:
      return { ...state, isSignedUp: true, errorMessage: null };
    case SIGNUP_ERROR:
      return { isSignedUp: false, errorMessage: action.payload}
    default:
      return state;
  }
}