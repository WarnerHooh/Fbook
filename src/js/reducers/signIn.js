import { SIGNING, SIGNEDIN, SIGNIN_ERROR } from '../actions/douban'

export default (state = { isSignedIn: false, isLoading: false }, action) => {
  switch (action.type) {
    case SIGNING:
      return { ...state, isLoading: true };
    case SIGNEDIN:
      return { ...state, isSignedIn: true, isLoading: false, errorMessage: null };
    case SIGNIN_ERROR:
      return { isSignedIn: false, isLoading: false, errorMessage: action.payload}
    default:
      return state;
  }
}