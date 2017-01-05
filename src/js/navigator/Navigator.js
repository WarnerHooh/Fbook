'use strict'

import React, { Component } from 'react'
import { NavigatorIOS } from 'react-native'

import IndexScene from '../scenes/Index'
import Scanner from '../scenes/Scanner'
import ScannerIcon from '../../image/scannerIcon.png'

export default class extends Component {
  _toScanner() {
    this.refs.nav.push({
      title: 'Scanning',
      component: Scanner
    })
  }

  render() {
    return (
    <NavigatorIOS
      ref='nav'
      initialRoute={{
        component: IndexScene,
        title: '',
        rightButtonIcon: ScannerIcon,
        onRightButtonPress: ::this._toScanner
      }}
      style={{flex: 1}}
    />
    )
  }
}