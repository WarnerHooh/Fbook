import React, {Component} from 'react'
import {
  StyleSheet,
  ListView,
  View,
  Text,
  Alert
} from 'react-native';
import SearchBar from 'react-native-search-bar';

export default class ListWithFilter extends Component {
  render() {
    let { onSearch, children, dataSource } = this.props

    if(dataSource && dataSource.length) {
      return (
        <View style={{flex: 1}}>
          <SearchBar
            placeholder={"Search"}
            autoCapitalize={'none'}
            onChangeText={onSearch}
          />
          { children }
        </View>
      )
    } else {
      return (
        <View style={style.noRecordView}>
          <Text style={style.noRecordText}>No Record.</Text>
        </View>
      )
    }
  }
}

