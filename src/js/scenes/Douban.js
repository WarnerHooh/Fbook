import React, { Component } from 'react'
import { View, TouchableHighlight, Text, TextInput, Image, StyleSheet, Dimensions } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import IonIcon from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Fumi } from 'react-native-textinput-effects';

import Button from '../components/Button'
import * as signInActions from '../actions/signIn'

class Douban extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      errorMessage: props.errorMessage
    }
  }

  handleSignIn() {
    let { username, password } = this.state;
    if(username.length === 0 || password.length === 0) {
      this.setState({
        errorMessage: 'Empty username or password.'
      })
    } else {
      this.setState({
        errorMessage: null
      })
      // this.props.actions.toSignIn({username, password});
    }
    this.selfDismiss();
  }

  selfDismiss = () => {
    this.props.navigator.dismissLightBox();
  }

  render() {
    return (
      <View style={ style.container }>
        <IonIcon onPress={::this.selfDismiss} style={style.close} name="ios-close" size={50} color="#fff" />

        <MaterialCommunityIcon style={style.logo} name="douban" size={100} color={ '#2E9968' } />

        <Fumi
          iconClass={FontAwesomeIcon}
          iconName={'user'}
          iconColor={'#2E9968'}
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

        <Fumi
          iconClass={FontAwesomeIcon}
          iconName={'lock'}
          iconColor={'#2E9968'}
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
          <Button onButtonPress={ ::this.handleSignIn }>Sign In</Button>
        </View>

      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width - 40,
    padding: 20,
    paddingTop: 80,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  grey: {
    color: '#a2a1b8',
  },
  close: {
    position: 'absolute',
    right: 20,
    top: 0
  },
  logo: {
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: 10,
  },
  field: {
    // marginBottom: 20
  },
  input: {
    fontWeight: 'normal',
    color: '#fff'
  },
  label: {
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    fontSize: 16,
    margin: 0,
    padding: 0,
    textAlign: 'center'
  },
  button: {
    marginTop: 60
  },
  errorView: {
    backgroundColor: 'transparent'
  },
  errorMessage: {
    color: '#f00',
    fontSize: 12
  },
})

const mapStateToProps = ({signIn}) => ({
  isSignedIn: signIn.isSignedIn,
  errorMessage: signIn.errorMessage
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(signInActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Douban)