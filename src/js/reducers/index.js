import { combineReducers } from 'redux'

import signIn from './signIn'
import signUp from './signUp'
import user from './user'
import douban from './douban'

export default combineReducers({
  signIn, signUp, user, douban
})