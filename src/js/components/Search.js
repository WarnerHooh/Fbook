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
    this.state = {
      expand: false,
      text: '',
    }
  }

  onSearch = () => {
    this.props.onSearch(this.state.text)
  }

  onTouch = () => {
    let { expand } = this.state;
    this.setState({
      expand: !expand
    })
    expand && this.onSearch();
  }

  render() {
    return (
      <View style={style.container}>
        { this.state.expand ? <TextInput
          style={style.input}
          placeholder="Type here to search!"
          value={this.state.text}
          onChangeText={(text) => this.setState({text})}
        /> : null}
        <Icon onPress={::this.onTouch} style={style.icon} name="search" size={20} color={'#000'}/>
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