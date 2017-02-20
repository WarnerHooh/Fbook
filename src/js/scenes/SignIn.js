import React, { Component } from 'react'
import { View, TouchableHighlight, Text, TextInput, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Hoshi } from 'react-native-textinput-effects';

import imageStyle from '../../style/image'
import colorStyle from '../../style/color'
import Button from '../components/Button'
import Loading from '../components/Loading'
import * as signInActions from '../actions/signIn'

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      errorMessage: props.errorMessage
    }

    this.handleResetNavigation(props)
  }

  componentWillReceiveProps(nextProps) {
    this.handleResetNavigation(nextProps)
  }

  handleResetNavigation({ token, navigator }) {
    token && navigator.resetTo({
      screen: 'fbook.HomeScene',
      animated: false,
      title: '',
    });
  }

  handleSignIn() {
    let { username, password } = this.state;
    if(username.length === 0 || password.length === 0) {
      this.setState({
        errorMessage: 'Empty username or password.'
      })
    } else {
      this.setState({
        errorMessage: null,
        isLoading: true
      })
      this.props.actions.toSignIn({username, password});
    }
  }

  handleSignUp() {
    this.props.navigator.push({
      screen: 'fbook.SignUpScene',
      title: 'Sign Up',
      backButtonTitle: 'back',
      navigatorStyle: {
        navBarHidden: true
      },
    })
  }

  render() {
    return (
      <Image source={require('../../image/signin-bg.png')} style={imageStyle.backgroundImage}>
        <View style={ style.container }>

          <Image source={require('../../image/logo.png')} style={style.logo} />

          <Hoshi
            label={'Username'}
            borderColor={'#ec2e40'}
            labelStyle={ [style.label, colorStyle.grey] }
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
            labelStyle={ [style.label, colorStyle.grey] }
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
            <Button onButtonPress={ ::this.handleSignIn }>Sign In</Button>
          </View>

          <View style={ style.signUp }>
            <Text style={ colorStyle.grey }>
              Don't have an account?  <Text style={ style.toSignUp }  onPress={ ::this.handleSignUp }>Sign Up</Text>
            </Text>
          </View>
        </View>

        <Loading show={this.props.isLoading} />
      </Image>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 100,
    overflow: 'visible',
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
  signUp: {
    marginTop: 10,
    height: 20,
    backgroundColor: 'transparent',
    alignSelf: 'center'
  },
  toSignUp: {
    color: '#fff',
    marginLeft: 10
  }
})

const mapStateToProps = ({user, signIn}) => ({
  token: user.token,
  isLoading: signIn.isLoading,
  errorMessage: signIn.errorMessage
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(signInActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)