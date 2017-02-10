import React, { Component } from 'react'
import { View, TouchableHighlight, Text, TextInput, Image, StyleSheet, Dimensions } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Hoshi } from 'react-native-textinput-effects';

import Home from './Home'
import SignUp from './SignUp'
import Button from '../components/Button'
import ScannerScene from './Scanner'
import ScannerIcon from '../../image/qr-code.png'
import * as loginActions from '../actions/login'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      errorMessage: props.errorMessage
    }
  }

  _toScanner() {
    this.props.navigator.push({
      title: 'Scanning',
      component: ScannerScene
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.isLogin) {
      this.props.navigator.push({
        component: Home,
        title: '',
        rightButtonIcon: ScannerIcon,
        onRightButtonPress: ::this._toScanner
      })
    }
  }

  handleLogin() {
    let { username, password } = this.state;
    if(username.length === 0 || password.length === 0) {
      this.setState({
        errorMessage: 'Empty username or password.'
      })
    } else {
      this.setState({
        errorMessage: null
      })
      this.props.actions.toLogin({username, password});
    }
  }

  handleSignUp() {
    this.props.navigator.push({
      component: SignUp,
      title: 'Sign Up',
      navigationBarHidden: false,
      rightButtonIcon: ScannerIcon,
    })
  }

  render() {
    return (
      <View>
        <Image source={require('../../image/login-bg.png')} style={style.backgroundImage} />

        <View style={ style.container }>

          <Image source={require('../../image/logo.png')} style={style.logo} />

          <Hoshi
            label={'Username'}
            borderColor={'#ec2e40'}
            labelStyle={ [style.label, style.grey] }
            inputStyle={ style.input }
            style={ style.field }
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={ (username) => { this.setState({username}) } }
            value={ this.state.username }
          />

          <Hoshi
            label={'Password'}
            borderColor={'#ec2e40'}
            style={ style.field }
            labelStyle={ [style.label, style.grey] }
            inputStyle={ style.input }
            autoCapitalize={'none'}
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={ (password) => { this.setState({password}) } }
            value={ this.state.password }
          />

          <View style={ style.errorView }>
            <Text style={ style.errorMessage }>{ this.state.errorMessage || this.props.errorMessage }</Text>
          </View>

          <View style={ style.button }>
            <Button onButtonPress={ ::this.handleLogin }>Sign In</Button>
          </View>

          <View style={ style.signUp }>
            <Text style={ style.grey }>
              Don't have an account?  <Text style={ style.toSignUp }  onPress={ ::this.handleSignUp }>Sign Up</Text>
            </Text>
          </View>

        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 100,
    overflow: 'visible'
  },
  grey: {
    color: '#a2a1b8',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 100,
    alignSelf: 'center'
  },
  field: {
    marginBottom: 20
  },
  input: {
    fontWeight: 'normal',
    color: '#fff'
  },
  label: {
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    margin: 0,
    padding: 0,
    textAlign: 'center'
  },
  button: {
    marginTop: 60
  },
  errorView: {
    marginTop: -10,
    backgroundColor: 'transparent'
  },
  errorMessage: {
    color: '#f00',
    fontSize: 12
  },
  backgroundImage:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    left: 0,
    top: 0,
    backgroundColor:'rgba(0,0,0,0)',
  },
  signUp: {
    marginTop: 60,
    height: 100,
    backgroundColor: 'transparent',
  },
  toSignUp: {
    color: '#fff',
    marginLeft: 10
  }
})

const mapStateToProps = ({login}) => ({
  isLogin: login.isLogin,
  errorMessage: login.errorMessage
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(loginActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)