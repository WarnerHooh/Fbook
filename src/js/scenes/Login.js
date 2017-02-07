import React, { Component } from 'react'
import { View, Text, TextInput, Image, StyleSheet, Dimensions } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Hoshi } from 'react-native-textinput-effects';

import Button from '../components/Button'
import * as loginActions from '../actions/loginAction'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleLogin() {
    let { username, password } = this.state;
    if(username === 'admin' && password === 'admin') {
      this.props.actions.toLogin();
    }
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
            labelStyle={ style.label }
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
            labelStyle={ style.label }
            inputStyle={ style.input }
            autoCapitalize={'none'}
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={ (password) => { this.setState({password}) } }
            value={ this.state.password }
          />

          <View style={ style.button }>
            <Button onButtonPress={ ::this.handleLogin }>Sign In</Button>
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
  },
  logo: {
    width: 80,
    height: 80,
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
    color: '#a2a1b8',
    fontWeight: 'bold',
    margin: 0,
    padding: 0,
    textAlign: 'center'
  },
  button: {
    marginTop: 60
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
  }
})

const mapStateToProps = (state) => {
  return {
    isLogin: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)