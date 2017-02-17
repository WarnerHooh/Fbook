import React, { Component } from 'react'
import { View, Text, TouchableHighlight, Alert, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import Button from '../components/Button'
import Search from '../components/Search'
import * as signInActions from '../actions/signIn'
import { iconsMap, iconsLoaded } from '../utils/appIcons'
var SearchBar = require('react-native-search-bar');


class Home extends Component {
  constructor(props) {
    super(props)

    // this.handleResetNavigation(props)
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

  state = { doubanSignedIn: false }

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
      this.navigateToScanner();
    }
  }

  navigateToScanner() {
    this.props.navigator.push({
      screen: 'fbook.ScannerScene',
      title: 'Scanning'
    });
  }

  handleProfile() {
    let { isSignedIn, navigator } = this.props;
    if(isSignedIn) {
      navigator.push({
        screen: 'fbook.BookListScene',
        title: 'Book List'
      });
    } else {
      navigator.push({
        screen: 'fbook.SignInScene',
        navigatorStyle: {
          navBarHidden: true
        }
      });
    }
  }

  showDoubanModal() {
    this.props.navigator.showLightBox({
      screen: "fbook.DoubanScene",
      passProps: {},
      style: {
        backgroundBlur: "light",
        backgroundColor: "rgba(0,0,0,0)"
      }
    });
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
        {/*<SearchBar ref='searchBar' placeholder='Search' onSearchButtonPress={(s) => {Alert.alert('', s)}} />*/}
        <MaterialCommunityIcon onPress={::this.navigateToScanner} style={ style.scanPanel } name="qrcode-scan" size={100} color="#bbb" />
        <FontAwesomeIcon onPress={::this.handleProfile} style={ style.user } name="user-circle-o" size={30} color={ this.props.isSignedIn ? '#2E9968' : '#ccc' } />
        <MaterialCommunityIcon onPress={::this.showDoubanModal} style={ style.douban } name="douban" size={30} color={ this.state.doubanSignedIn ? '#2E9968' : '#ccc' } />
        {/*<Button onButtonPress={ this.props.actions.toSignOut }>Sign Out</Button>*/}
        {/*<Text>{ JSON.stringify(this.props.user) }</Text>*/}
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1
  },
  scanPanel: {
    textAlign: 'center',
    marginTop: 260,
  },
  user: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    backgroundColor: '#fff'
  },
  douban: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#fff'
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