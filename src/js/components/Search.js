import React, {Component} from 'react'
import {
  Text,
  View,
  TextInput,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'

export default class Search extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={style.container}>
       <TextInput
          style={style.input}
          placeholder="Type here to search!"
          onFocus={this.props.onFocus}
          ref="input"
        />
        <Icon style={style.icon} name="search" onPress={()=>{this.refs.input.focus()}} size={20} color={'#000'}/>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    height: 34,
    overflow: 'visible',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#a2a1b8',
    height: 34,
    paddingHorizontal: 10,
    fontSize: 14,
    borderRadius: 3,
    paddingRight: 35
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 6,
    backgroundColor: 'transparent'
  }
})