import React, { Component } from 'react'
import { NavigatorIOS } from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import HomeScene from '../scenes/Home'
import LoginScene from '../scenes/Login'
import Scanner from '../scenes/Scanner'
import ScannerIcon from '../../image/qr-code.png'
import * as loginActions from '../actions/login'

class FBookNavigator extends Component {
  constructor(props) {
    super(props)
  }

  _toScanner() {
    this.refs.nav.push({
      title: 'Scanning',
      component: Scanner
    })
  }

  render() {
    return (
      this.props.isLogin ? <NavigatorIOS
        ref='nav'
        initialRoute={{
          component: HomeScene,
          title: '',
          rightButtonIcon: ScannerIcon,
          onRightButtonPress: ::this._toScanner
        }}
        style={{flex: 1}}
      /> : <LoginScene />
    )
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.login
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(loginActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(FBookNavigator)