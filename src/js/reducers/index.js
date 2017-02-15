import { combineReducers } from 'redux'

import signIn from './signIn'
import signUp from './signUp'
import user from './user'

export default combineReducers({
  signIn, signUp, user
})