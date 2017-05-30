import React, { Component } from 'react'
import { View,  Image, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Navigation } from 'react-native-navigation';

import Search from '../components/Search'
import * as signInActions from '../actions/signIn'

class Home extends Component {
  constructor(props) {
    super(props)

    this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent)
  }

  _onNavigatorEvent = (event) => {
    if (event.id === 'scan') {
      this._navigateToScanner();
    }
  }

  _navigateToScanner = () => {
    this.props.navigator.push({
      screen: 'fbook.ScannerScene',
      title: 'Scanning',
      navigatorStyle: {
        tabBarHidden: true
      }
    });
  }

  _onSearch = () => {
    Navigation.showModal({
      screen: "fbook.SearchScene",
      title: "Search",
      passProps: {},
      navigatorStyle: {},
      navigatorButtons: {
        leftButtons: [
          {
            title: 'Back',
            id: 'goBack'
          }
        ]
      },
      animationType: 'slide-up'
    });
  }

  render() {
    return (
      <View style={ style.container }>
        <MaterialCommunityIcon onPress={this._navigateToScanner} style={[style.toolIcon, style.scannerIcon,]}
                               name="qrcode-scan" size={25} color="#007aff"/>
        <Image source={require('../../image/logo.png')} style={style.logo}/>
        <View style={{marginHorizontal: 20, top: 70}}>
          <Search onFocus={::this._onSearch}/>
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginTop: 100
  },
  scanner: {
    textAlign: 'center',
  },
  toolIcon: {
    position: 'absolute',
    top: 0,
    backgroundColor: '#fff'
  },
  userIcon: {
    left: 30,
  },
  scannerIcon: {
    right: 20,
  },
})

const mapStateToProps = ({user}) => {
  return {
    token: user.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(signInActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)