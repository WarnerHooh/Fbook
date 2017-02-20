import { AsyncStorage } from 'react-native'
import { compose, applyMiddleware, createStore } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk'

import reducers from '../reducers'

export default () => {
  const store = createStore(
    reducers,
    undefined,
    compose(
      applyMiddleware(thunk),
      autoRehydrate()
    )
  )

  persistStore(store, {storage: AsyncStorage})
  return store
}
