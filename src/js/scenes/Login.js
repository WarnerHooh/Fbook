import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Button from '../components/Button'
import * as loginActions from '../actions/loginAction'

class Login extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={ style.container }>
        <Button onButtonPress={ this.props.actions.toLogin }>Sign In</Button>
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 200
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