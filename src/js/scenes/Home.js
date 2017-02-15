import React, { Component } from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Button from '../components/Button'
import * as signInActions from '../actions/signIn'
import { iconsMap, iconsLoaded } from '../utils/appIcons'

class Home extends Component {
  constructor(props) {
    super(props)
    this.handleResetNavigation(props)
    this.props.navigator.setOnNavigatorEvent(::this.onNavigatorEvent)

    iconsLoaded.then(() => {
      this.props.navigator.setButtons({
        rightButtons: [{
          icon: iconsMap['qrcode'],
          id: 'scan'
        }]
      })
    })
  }

  // static navigatorButtons = {
  //   rightButtons: [
  //     {
  //       icon: require('../../image/qr-code.png'),
  //       id: 'scan'
  //     }
  //   ]
  // }

  componentWillReceiveProps(nextProps) {
    this.handleResetNavigation(nextProps);
  }

  onNavigatorEvent(event) {
    if (event.id === 'scan') {
      this.props.navigator.push({
        screen: 'fbook.ScannerScene',
        title: 'Scanning'
      });
    }
  }

  handleResetNavigation({ isSignedIn, navigator }) {
    isSignedIn || navigator.resetTo({
      screen: 'fbook.SignInScene',
      animated: false,
      navigatorStyle: {
        navBarHidden: true
      }
    });
  }

  render() {
    return (
      <View style={ style.container }>
        <Button onButtonPress={ this.props.actions.toSignOut }>Sign Out</Button>
        <Text>{ JSON.stringify(this.props.user) }</Text>
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    marginTop: 100
  }
})

const mapStateToProps = (state) => {
  return {
    user: state.user,
    isSignedIn: state.signIn.isSignedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(signInActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)