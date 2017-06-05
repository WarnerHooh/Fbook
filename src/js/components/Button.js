import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Button from 'react-native-button'

export default class extends Component {
  _onPress = () => {
    this.props.onButtonPress()
  }

  render() {
    return (
      <Button
        activeOpacity={0.7}
        containerStyle={ style.container }
        style={ style.button }
        onPress={ this._onPress }
      >
        { this.props.children }
      </Button>
    )
  }
}

const style = StyleSheet.create({
  container: {
    padding: 10,
    height: 45,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: '#FF4A6A'
  },
  button: {
    fontSize: 20,
    color: 'white'
  }
})