import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

import reducers from '../reducers'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

export default () => {
  const store = createStoreWithMiddleware(reducers)
  return store
}
