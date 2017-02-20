import React, { Component } from 'react'
import { View, TouchableHighlight, Text, TextInput, Image, StyleSheet, Dimensions } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import IonIcon from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Fumi } from 'react-native-textinput-effects';

import Loading from '../components/Loading'
import Button from '../components/Button'
import * as doubanActions from '../actions/douban'

class Douban extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'wangpei9679@163.com',
      password: 'wangpei12315232',
      captchaSolution: '',
      errorMessage: props.errorMessage
    }
  }

  handleSignIn() {
    let { username, password, captchaSolution } = this.state;
    if(username.length === 0 || password.length === 0) {
      this.setState({
        errorMessage: 'Empty username or password.'
      })
    } else {
      this.setState({
        errorMessage: null
      })
      this.props.actions.toSignIn({username, password, captchaSolution}).then(() => {
        this.selfDismiss();
      }).catch((e) => {

      });
    }
  }

  selfDismiss = () => {
    this.props.navigator.dismissLightBox();
  }

  componentDidMount() {
    this.props.actions.getVcode();
  }

  render() {
    let { vcode, isLoading } = this.props;
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

        { vcode.captchaImageUrl ? <View style={style.vcode}>
          <Image source={{uri: vcode.captchaImageUrl}} style={{flex: 2}} />
          <TextInput
            style={ style.vcodeInput }
            onChangeText={ (captchaSolution) => { this.setState({captchaSolution}) } }
            value={ this.state.captchaSolution }
            autoCapitalize="none"
            spellCheck={false}
          />
        </View> : null}

        <View style={ style.errorView }>
          <Text style={ style.errorMessage }>{ this.state.errorMessage || this.props.errorMessage }</Text>
        </View>

        <View style={ style.button }>
          <Button onButtonPress={ ::this.handleSignIn }>Sign In</Button>
        </View>

        <Loading show={isLoading} />
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
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignSelf: 'center'
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
    color: '#000'
  },
  label: {
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    fontSize: 16,
    margin: 0,
    padding: 0,
    textAlign: 'center'
  },
  vcode: {
    height: 40,
    flexDirection: 'row',
    marginTop: 20
  },
  vcodeInput: {
    height: 40,
    width: 100,
    marginLeft: 10,
    borderColor: '#fff',
    backgroundColor: '#fff',
    borderWidth: 1,
    padding: 10,
  },
  button: {
    marginTop: 40
  },
  errorView: {
    backgroundColor: 'transparent'
  },
  errorMessage: {
    color: '#f00',
    fontSize: 12
  },
})

const mapStateToProps = ({douban}) => ({
  isSignedIn: douban.isSignedIn,
  isLoading: douban.isLoading,
  errorMessage: douban.errorMessage,
  vcode: douban.vcode
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(doubanActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Douban)