import React, { Component } from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'

// import Scanner from '../components/Scanner'
import Scanner from './Scanner'
import Playground from '../components/Playground'

export default class extends Component {
  constructor(props) {
    super(props)
  }

  _onForward() {
    const { navigator } = this.props
    navigator.push({
      title: 'Scanning',
      component: Scanner
    })
  }

  _onBack() {
    const { navigator } = this.props
    navigator.pop()
  }

  render() {
    return (
      <View style={ style.container }>
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    marginTop: 100
  }
})