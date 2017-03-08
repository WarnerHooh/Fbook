import React, { Component } from 'react'
import { View, TouchableHighlight, Text, TextInput, Image, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Hoshi } from 'react-native-textinput-effects';

import imageStyle from '../../style/image'
import colorStyle from '../../style/color'
import Button from '../components/Button'
import Loading from '../components/Loading'
import * as signUpActions from '../actions/signUp'

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      passwordConfirm: '',
      email: '',
      errorMessage: props.errorMessage
    }
  }

  handleSignUp() {
    let { username, email, password, passwordConfirm } = this.state;
    let errorMessage;

    if(username.length === 0) {
      errorMessage = 'Empty username.';
    } else if(email.length === 0) {
      errorMessage = 'Empty email address.';
    } else if(password.length === 0) {
      errorMessage = 'Empty password.';
    } else if(password !== passwordConfirm) {
      errorMessage = 'Confirm password does not equal to the password';
    } else {
      this.props.actions.toSignUp({username, email, password});
    }
    this.setState({ errorMessage });
  }

  handleSignIn() {
    this.props.navigator.pop();
  }

  render() {
    return (
        <Image source={require('../../image/signup-bg.png')} style={imageStyle.backgroundImage}>
          <View style={ style.container }>
            <Text style={ style.title }>Sign Up</Text>

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
              label={'Email Address'}
              borderColor={'#ec2e40'}
              labelStyle={ [style.label, colorStyle.grey] }
              inputStyle={ style.input }
              style={ style.field }
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={ (email) => { this.setState({email}) } }
              value={ this.state.email }
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

            <Hoshi
              label={'Confirm Password'}
              borderColor={'#ec2e40'}
              style={ style.field }
              labelStyle={ [style.label, colorStyle.grey] }
              inputStyle={ style.input }
              autoCapitalize={'none'}
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={ (passwordConfirm) => { this.setState({passwordConfirm}) } }
              value={ this.state.passwordConfirm }
            />

            <View style={ style.errorView }>
              <Text style={ style.errorMessage }>{ this.state.errorMessage || this.props.errorMessage }</Text>
            </View>

            <View style={ style.button }>
              <Button onButtonPress={ ::this.handleSignUp }>Sign Up</Button>
            </View>

            <View style={ style.signIn }>
              <Text style={ colorStyle.grey }>
                Already have an account?  <Text style={ style.toSignUp }  onPress={ ::this.handleSignIn }>Sign In</Text>
              </Text>
            </View>
          </View>
          <Loading show={this.props.loader} />
        </Image>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
    overflow: 'visible'
  },
  title: {
    height: 30,
    marginBottom: 10,
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: '#fff',
  },
  grey: {
    color: '#a2a1b8',
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
  signIn: {
    marginTop: 10,
    height: 20,
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  toSignUp: {
    color: '#fff',
    marginLeft: 10
  }
})

const mapStateToProps = ({signUp, loader}) => ({
  loader: loader,
  errorMessage: signUp.errorMessage
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(signUpActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)