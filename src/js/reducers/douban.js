import { SIGNING, SIGNEDIN, SIGNIN_ERROR, SET_VCODE, SET_COOKIE } from '../actions/douban'

export default (state = { isSignedIn: false, isLoading: false, vcode: {}, cookie: {} }, action) => {
  switch (action.type) {
    case SIGNING:
      return { ...state, isLoading: true };
    case SIGNEDIN:
      return { ...state, isSignedIn: true, isLoading: false, errorMessage: null };
    case SIGNIN_ERROR:
      return { ...state, isSignedIn: false, isLoading: false, errorMessage: action.payload};
    case SET_VCODE:
      return { ...state, vcode: action.payload };
    case SET_COOKIE:
      return { ...state, cookie: action.payload}
    default:
      return state;
  }
}