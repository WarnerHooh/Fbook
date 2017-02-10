import { LOGIN, LOGOUT, LOGERROR } from '../actions/login'

export default (state = { isLogin: false }, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLogin: true };
    case LOGOUT:
      return { ...state, isLogin: false };
    case LOGERROR:
      return { isLogin: false, errorMessage: action.payload}
    default:
      return state;
  }
}