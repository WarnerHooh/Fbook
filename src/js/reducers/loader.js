import { SWITCH_LOADER } from '../actions/loader'

export default (state = false, action) => {
  switch (action.type) {
    case SWITCH_LOADER:
      return action.payload;
    default:
      return state;
  }
}