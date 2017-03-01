import { AsyncStorage } from 'react-native'
import { compose, applyMiddleware, createStore } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk'

import reducers from '../reducers'

let persistor;

export default () => {
  const store = createStore(
    reducers,
    undefined,
    compose(
      applyMiddleware(thunk),
      autoRehydrate()
    )
  )

  persistor = persistStore(store, {
    storage: AsyncStorage,
    whitelist: 'user'
  })
  return store
}

export const purge = () => {
  persistor && persistor.purge()
}
