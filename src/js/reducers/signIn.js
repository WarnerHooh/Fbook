import { SIGNING, SIGNOUT, SIGNEDIN, SIGNIN_ERROR } from '../actions/signIn'

export default (state = { isSignedIn: false, isLoading: false }, action) => {
  switch (action.type) {
    case SIGNING:
      return { ...state, isLoading: true };
    case SIGNEDIN:
      return { ...state, isSignedIn: true, isLoading: false, errorMessage: null };
    case SIGNIN_ERROR:
      return { isSignedIn: false, isLoading: false, errorMessage: action.payload};
    case SIGNOUT:
      return { isSignedIn: false, isLoading: false, errorMessage: null };
    default:
      return state;
  }
}