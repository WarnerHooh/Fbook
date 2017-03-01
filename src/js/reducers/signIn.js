import { SIGNIN_ERROR } from '../actions/signIn'

export default (state = { }, action) => {
  switch (action.type) {
    case SIGNIN_ERROR:
      return { errorMessage: action.payload };
    default:
      return state;
  }
}