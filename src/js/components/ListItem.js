import React, {Component} from 'react'
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  Switch,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class ListItem extends Component {
  render() {
    const { children, onPress } = this.props

    if(onPress) {
      return (
        <KeyboardAvoidingView behavior='height'>
          <View style={style.extra}>
            <TouchableHighlight underlayColor="#BBB" onPress={onPress}>
              <View style={style.container}>
                <View style={style.labelView}>
                  <Text style={style.labelText}>{ this.props.label }</Text>
                </View>
                { children }
                <View style={style.arrow}>
                  <Icon name='angle-right' size={25} color="#ccc" style={style.icon} />
                </View>
              </View>
            </TouchableHighlight>
          </View>
        </KeyboardAvoidingView>
      )
    }

    return (
      <View style={style.container}>
        <View style={style.labelView}>
          <Text style={style.labelText}>{ this.props.label }</Text>
        </View>
        { children }
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor:'#fff'
  },
  extra: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: '#eee',
    marginTop: -1,
  },
  labelView: {
    width: 120
  },
  labelText: {
    color: '#a2a1b8',
    lineHeight: 38
  },
  arrow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  icon: {
    marginTop: 8
  }
})
