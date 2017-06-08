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

import { updateUser, setUser } from '../actions/user'

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
    console.log(user)
    const {username, telephone, email, address} = user

    this.setState({
      username: this.state['username'] || username,
      telephone: this.state['telephone'] || telephone,
      email: this.state['email'] || email,
      address: this.state['address'] || address
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
    this.setState({ username: '', telephone: '', email: '', address: '' }, () => {
      signOut();
      navigator.switchToTab({
        tabIndex: 0
      })
    })
  }

  _handleChangeText = (name) => {
    return (text) => {
      this.setState({
        [name]: text
      })
    }
  }

  _handleUpdate = (name) => () => {
    const { user } = this.props

    if(this.state[name] !== user[name]) {
      updateUser({
        id: user.id,
        [name]: this.state[name]
      }).then(() => {
        setUser({
          ...user,
          [name]: this.state[name]
        })
      }).catch((e) => {
        Alert.alert('Error', `${e}`)
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
                    <Text style={[styles.textInput, styles.disabled]}>{ username }</Text>
                  </ListItem>

                  <ListItem label="Email">
                    <TextInput returnKeyType='done' keyboardType="email-address" style={styles.textInput} value={email} onChangeText={this._handleChangeText('email')} onBlur={ this._handleUpdate('email') } />
                  </ListItem>

                  <ListItem label="Mobile">
                    <TextInput returnKeyType='done' keyboardType="phone-pad" style={styles.textInput} value={telephone} onChangeText={this._handleChangeText('telephone')} onBlur={ this._handleUpdate('telephone') } />
                  </ListItem>

                  <ListItem label="Address">
                    <TextInput returnKeyType='done' style={styles.textInput} value={address} onChangeText={this._handleChangeText('address')} onBlur={ this._handleUpdate('address') } />
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
    lineHeight: 40,
    fontSize: 16,
    textAlign: 'right'
  },
  switcher: {
    marginTop: 4,
    transform: [{scale: 0.8}]
  },
  disabled: {
    color: '#777'
  }
});

const mapStateToProps = ({user}) => ({
  user
})

const mapDispatchToProps = (dispatch) => ({
  signOut: bindActionCreators(toSignOut, dispatch),
  setUser: bindActionCreators(setUser, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
