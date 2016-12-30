import React, { Component } from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'

import Scanner from '../components/Scanner'

export default class extends Component {
  render() {
    return (
      <View style={ style.container }>
        <Scanner />
        <Text>Current Scene: {this.props.title}</Text>

        <TouchableHighlight onPress={this.props.onForward}>
          <Text>Tap me to load the next scene</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.props.onBack}>
          <Text>Tap me to go back</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    marginTop: 100
  }
})