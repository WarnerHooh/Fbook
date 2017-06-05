import { AsyncStorage } from 'react-native'
import { compose, applyMiddleware, createStore } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk'

import reducers from '../reducers'
import { setUser } from '../actions/user'

let persistor, store;

export function purge () {
  persistor && persistor.purge()
  store.dispatch(setUser({}))
}

export function getState(key) {
  return store && store.getState()[key]
}

export default function() {
  store = createStore(
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