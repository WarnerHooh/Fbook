import React, { Component } from 'react'
import { NavigatorIOS } from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import HomeScene from '../scenes/Home'
import SignScene from '../scenes/SignIn'
import ScannerScene from '../scenes/Scanner'
import ScannerIcon from '../../image/qr-code.png'
import * as loginActions from '../actions/login'

class FBookNavigator extends Component {
  constructor(props) {
    super(props)
  }

  _toScanner() {
    this.refs.nav.push({
      title: 'Scanning',
      component: ScannerScene
    })
  }

  render() {
    return <NavigatorIOS
      ref='nav'
      initialRoute={
        this.props.isLogin ?
        {
          component: HomeScene,
          title: '',
          rightButtonIcon: ScannerIcon,
          onRightButtonPress: ::this._toScanner
        } :
        {
          component: SignScene,
          title: '',
          navigationBarHidden: true
        }
      }
      style={{flex: 1}}
    />
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.login.isLogin
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(loginActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(FBookNavigator)