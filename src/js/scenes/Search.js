import React, { Component } from 'react'
import { View, Text, TouchableHighlight, Image, Alert, StyleSheet, ListView } from 'react-native'

import { Navigation } from 'react-native-navigation';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'

import SearchBar from 'react-native-search-bar';
import BookItem from '../components/BookItem'
import { searchBook } from '../actions/book'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => (r1 !== r2) })

export default class extends Component {
  constructor(props){
    super(props)

    this.state = {
      dataSource: ds.cloneWithRows([])
    };

    props.navigator.setOnNavigatorEvent(::this._onNavigatorEvent)
  }

  _onNavigatorEvent = (event) => {
    if (event.id === 'goBack') {
      Navigation.dismissModal({animationType: 'none'})
    }
  }

  _onSearch = debounce((str) => {
    let bookName = str.replace(/\s/g, '');
    if(bookName.length) {
      searchBook(str).then((bookList) => {
        this.setState({
          dataSource: ds.cloneWithRows(bookList)
        })
      }).catch((e) => {
        Alert.alert('Error', `${e}`)
        // this.props.navigator.pop();
      })
    }
  }, 500)

  _onPressSearchButton = () => {
    this.refs.searchBar.blur();
  }

  componentDidMount() {
    this.refs.searchBar.focus();
  }

  render() {
    const { dataSource } = this.state
    return (
      <View style={{flex: 1}}>
        <SearchBar ref='searchBar' onChangeText={this._onSearch} autoCapitalize="none" onSearchButtonPress={this._onPressSearchButton} />
        <ListView
          enableEmptySections={true}
          dataSource={dataSource}
          renderRow={(book, sectionID, rowID) => <BookItem key={book.id} book={book} status={book.status} bookOwner={book.user} navigator={this.props.navigator} />}
        />
      </View>
    )
  }
}