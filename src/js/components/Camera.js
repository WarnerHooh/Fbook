import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

export default () => (
  <View style={ style.placeholder }/>
)

const style = StyleSheet.create({
  placeholder: {
    width: 100,
    height: 100,
    backgroundColor: '#00ff00'
  }
})