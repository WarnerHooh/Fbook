import React, { Component } from 'react'
import { View, Text, TouchableHighlight, Image, Alert, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Navigation } from 'react-native-navigation';

import Button from '../components/Button'
import Search from '../components/Search'
import * as signInActions from '../actions/signIn'
import { iconsMap, iconsLoaded } from '../utils/appIcons'


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

  // static navigatorButtons = {
  //   rightButtons: [
  //     {
  //       icon: require('../../image/qr-code.png'),
  //       id: 'scan'
  //     }
  //   ]
  // }

  componentWillReceiveProps(nextProps) {
    // this.handleResetNavigation(nextProps);
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
    let { token, navigator } = this.props;
    if(token) {
      navigator.push({
        // screen: 'fbook.BookListScene',
        // title: 'Book List'
        screen: 'fbook.UserInfoScene',
        title: 'Profile'
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
    let { token, navigator } = this.props;
    token && navigator.showLightBox({
      screen: "fbook.DoubanScene",
      passProps: {},
      style: {
        backgroundBlur: "light",
        backgroundColor: "rgba(0,0,0,0)"
      }
    });
  }

  handleResetNavigation({ token, navigator }) {
    token || navigator.resetTo({
      screen: 'fbook.SignInScene',
      animated: false,
      navigatorStyle: {
        navBarHidden: true
      }
    });
  }

  _onSearch = () => {
    Navigation.showModal({
      screen: "fbook.SearchScene", // unique ID registered with Navigation.registerScreen
      title: "Search", // title of the screen as appears in the nav bar (optional)
      passProps: {}, // simple serializable object that will pass as props to the modal (optional)
      navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
      navigatorButtons: {leftButtons: [
        {
          title: 'Back',
          id: 'goBack'
        }
      ]}, // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
      animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
    });
  }

  render() {
    let { token } = this.props;
    return (
      <View style={ style.container }>
        <Image source={require('../../image/logo.png')} style={style.logo} />
        {/*<SearchBar ref='searchBar' placeholder='Search' onSearchButtonPress={(s) => {Alert.alert('', s)}} />*/}
        <View style={{marginHorizontal: 20, top: 70}}>
          <Search onFocus={::this._onSearch} />
        </View>
        <FontAwesomeIcon onPress={::this.handleProfile} style={[style.toolIcon, style.userIcon]} name="user-circle-o" size={30} color={ token ? '#2E9968' : '#ccc' } />
        <MaterialCommunityIcon onPress={::this.navigateToScanner} style={[style.toolIcon, style.scannerIcon]} name="qrcode-scan" size={25} color="#007aff" />
        {/*<Button onButtonPress={ this.props.actions.toSignOut }>Sign Out</Button>*/}
        {/*<Text onPress={::this._onSearch}>{ token }</Text>*/}
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
    bottom: 30,
    backgroundColor: '#fff'
  },
  userIcon: {
    left: 30,
  },
  scannerIcon: {
    right: 30,
  }
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