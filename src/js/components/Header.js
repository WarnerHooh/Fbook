import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class Header extends Component {

  render() {
    return (
      <View style={{height: 70, alignItems: 'center', justifyContent: 'center', paddingTop: 20, overflow: 'hidden', backgroundColor: '#FFFFFF', zIndex: 999}}>
        <Text style={{fontWeight: 'bold', fontSize: 15}}>{this.props.title}</Text>
      </View>
    )
  }
}