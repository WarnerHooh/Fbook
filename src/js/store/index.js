import { AsyncStorage } from 'react-native'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

import reducers from '../reducers'
import { loadLocalState } from '../utils/localStorage'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

export default () => {
  const store = createStoreWithMiddleware(reducers)
  loadLocalState(store)
  return store
}
