
import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class ActionButton extends Component{
  constructor(props) {
    super(props)
  }

  _onPress = () => {
    this.props.onAction();
  }

  render() {
    return (
      <View style={[style.container, style.shadow, this.props.style]}>
        <Text style={style.text}>{this.props.text}</Text>
        <Text style={style.filling} onPress={this._onPress} />
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  filling: {
    position: 'absolute',
    top: 0, left: 0,
    padding: 100,
    backgroundColor: 'transparent',
  },
  shadow: {
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowColor: '#000',
    shadowRadius: 3,
    shadowOpacity: 0.4
  }
})