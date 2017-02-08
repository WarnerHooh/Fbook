import React, { Component } from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Button from '../components/Button'
import * as loginActions from '../actions/login'

class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={ style.container }>
        <Button onButtonPress={ this.props.actions.toLogout }>Sign Out</Button>
        <Text>{ JSON.stringify(this.props.user) }</Text>
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    marginTop: 100
  }
})

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)