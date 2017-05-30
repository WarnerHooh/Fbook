import React, {Component} from 'react'
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  Switch,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { toSignOut } from '../actions/signIn'
import imageStyle from '../../style/image'
import colorStyle from '../../style/color'
import ListItem from '../components/ListItem'

class UserInfo extends Component {

  constructor(props) {
    super(props);

    let {username, telephone, email, address} = this.props.user;

    this.state = {
      username, telephone, email, address
    };

    this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent);
  }

  componentWillReceiveProps({user}) {
    const {username, telephone, email, address} = user
    const {_username, _telephone, _email, _address} = this.state

    this.setState({
      username: _username || username,
      telephone: _telephone || telephone,
      email: _email || email,
      address: _address || address
    })
  }

  _onNavigatorEvent = (event) => {
    if (event.id === 'bottomTabSelected') {
      const { user } = this.props

      if(user.token) {
        this.setState({ user })
      } else {
        this.props.navigator.push({
          screen: "fbook.SignInScene",
          navigatorStyle: {
            navBarHidden: true,
            tabBarHidden: true
          },
          passProps: {},
          navigatorButtons: {},
          animationType: 'none'
        });
      }
    }
  }

  _handleSignOut = () => {
    const { navigator, signOut } = this.props

    signOut();
    navigator.switchToTab({
      tabIndex: 0
    })
  }

  _handleChangeText = (name) => {
    return (text) => {
      this.setState({
        [name]: text
      })
    }
  }

  render() {
    let {username, telephone, email, address} = this.state;

    return (
      <ScrollView>
        <Image source={require('../../image/user-bg.png')} style={imageStyle.backgroundImage}>
          <View style={styles.container}>
            <View style={styles.avatarBox}>
              <Image style={styles.avatar} source={require('../../image/react.png')} />
            </View>

            <View style={styles.infoBox}>
                <View style={{flexGrow: 1, backgroundColor: '#fff'}}>
                  <ListItem label="Username">
                    <TextInput returnKeyType='done' style={styles.textInput} value={username} onChangeText={this._handleChangeText('username')} />
                  </ListItem>

                  <ListItem label="Email">
                    <TextInput returnKeyType='done' keyboardType="email-address" style={styles.textInput} value={email} onChangeText={this._handleChangeText('email')} />
                  </ListItem>

                  <ListItem label="Mobile">
                    <TextInput returnKeyType='done' keyboardType="phone-pad" style={styles.textInput} value={telephone} onChangeText={this._handleChangeText('telephone')} />
                  </ListItem>

                  <ListItem label="Address">
                    <TextInput returnKeyType='done' style={styles.textInput} value={address} onChangeText={this._handleChangeText('address')} />
                  </ListItem>

                  {/*<ListItem label="Facebook">*/}
                    {/*<View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>*/}
                      {/*<Switch*/}
                        {/*onValueChange={(value) => this.setState({falseSwitchIsOn: value})}*/}
                        {/*onTintColor='#FF4A6A'*/}
                        {/*style={styles.switcher}*/}
                        {/*value={this.state.falseSwitchIsOn} />*/}
                    {/*</View>*/}
                  {/*</ListItem>*/}
                </View>

                <View style={{flex: 1, borderTopWidth: 1, borderColor: '#eee', marginTop: 20}}>
                  <ListItem label="Sign Out" onPress={this._handleSignOut} />
                </View>

              </View>
            </View>
        </Image>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 300
  },
  avatarBox: {
    top: -200,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#000',
    alignSelf: 'center',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowColor: '#fff',
    shadowRadius: 4,
    shadowOpacity: 0.5,
  },
  avatar: {
    width: 80,
    height: 80,
    overflow: 'hidden',
    borderRadius: 40
  },
  infoBox: {
    backgroundColor: '#EFEFEF',
    top: -130,
  },
  textInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    textAlign: 'right'
  },
  switcher: {
    marginTop: 4,
    transform: [{scale: 0.8}]
  }
});

const mapStateToProps = ({user}) => ({
  user
})

const mapDispatchToProps = (dispatch) => ({
  signOut: bindActionCreators(toSignOut, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
