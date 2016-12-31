'use strict'

import React, { Component } from 'react'
import { Navigator } from 'react-native'

import IndexScene from '../scenes/Index'

export default class extends Component {
  render() {
    return (
      <Navigator initialRoute={ {title: 'init', index: 1} }
                 renderScene={(route, navigator) => {
                    return <IndexScene title={ route.title }
                                       onForward={() => {
                                         console.log(222)
                                         const nextIndex = route.index + 1;
                                         navigator.push({
                                           title: 'Scene ' + nextIndex,
                                           index: nextIndex,
                                         });
                                       }}
                                       onBack={() => {
                                         if (route.index > 0) {
                                           navigator.pop();
                                         }
                                       }} />
                 }}
      />
    )
  }
}