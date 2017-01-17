import React from 'react'
import { Provider } from 'react-redux'

import configureStore from './store'
import Navigator from './navigator/Navigator'

const store = configureStore()

export default () => {
  return (
    <Provider store={ store }>
      <Navigator />
    </Provider>
  )
}