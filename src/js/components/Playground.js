import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

export default class extends Component {
  render() {
    return (
      <View style={ style.container }>
        <View style={ [style.item, style.item1] } />
        <View style={ [style.item, style.item2] } />
        <View style={ [style.item, style.item3] } />
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'red',
    alignSelf: 'stretch',
    height: 300,
    flexDirection: 'column',
    // justifyContent: 'space-between',
    alignItems: 'flex-end'
  },

  item: {
    width: 50,
    height: 50
  },

  item1: {
    backgroundColor: '#f00',
    flex: 1
  },

  item2: {
    backgroundColor: '#0f0',
    flex: 2
  },

  item3: {
    backgroundColor: '#00f',
    flex: 3
  }
})