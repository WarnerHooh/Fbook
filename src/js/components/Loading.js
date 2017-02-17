import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native'

export default ({show}) => (
  show ? <View style={style.container}>
    <ActivityIndicator
      style={style.indicator}
      size="large"
    />
  </View> : null
)

const style = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    height: 80
  }
})