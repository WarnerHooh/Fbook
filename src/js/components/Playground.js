import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Easing
} from 'react-native'

class AnimationSimple extends Component {
  constructor() {
    super()
    this.spinValue = new Animated.Value();
    this.springValue = new Animated.Value(0.3);
  }

  spin = () => {
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear
      }
    ).start(() => {this.spin()})
  }

  spring = () => {
    Animated.spring(
      this.springValue,
      {
        toValue: 1,
        friction: 5,
      }
    ).start()
  }

  componentDidMount() {
    this.spin()
    this.spring()
  }

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })

    const ml = this.spinValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 200, 0]
    })

    return (
      <View>
        <Animated.Image
          style={{
            width: 227,
            height: 200,
            transform: [{scale: this.springValue}] }}
          source={{uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png'}}
        />
        <Animated.View
          style={{
            width: 20,
            height: 20,
            backgroundColor: 'green',
            marginLeft: ml
          }}
        />
      </View>
    )
  }
}

export default class extends Component {
  render() {
    return (
      <View style={ style.container }>
        <AnimationSimple />
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
    alignItems: 'flex-start'
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
  },
  animation: {
    width: 200,
    height: 200,
    borderWidth: 1
  }
})