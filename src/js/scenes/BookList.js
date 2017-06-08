import React, { Component } from 'react'
import {
  StyleSheet,
  ListView,
  View,
  Text,
  RefreshControl,
  Alert
} from 'react-native';
import SearchBar from 'react-native-search-bar';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import BookItem from '../components/BookItem'
import { getMyBooks, removeBook } from '../actions/book'
import Header from '../components/Header'
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => (r1 !== r2)})

let bookListStored = [];

class BookList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      bookList: [],
      dataSource: ds.cloneWithRows([])
    };

    this._fetchData(props.user.id)
    // this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent);
  }

  componentWillReceiveProps(nextProps) {

    const userId = nextProps.user.id

    if(this.props.user.id !== userId) {
      this._fetchData(userId)
    } else {
      bookListStored = [];
      this.setState({
        bookList: [],
        dataSource: ds.cloneWithRows([])
      })
    }
  }

  _fetchData = (userId) => {
    userId && getMyBooks(userId, {limit: 100}).then((bookList) => {
      bookListStored = bookList
      this.setState({
        bookList,
        dataSource: ds.cloneWithRows(bookList)
      })
    }).catch((e) => {
      Alert.alert('Error', `${e}`)
    }).finally(() => {
      this.setState({refreshing: false});
    })
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this._fetchData(this.props.user.id)
  }

  _onDelete = (index) => (id) => {
    removeBook(id).then(() => {
      let {bookList} = this.state
      bookList.splice(index, 1)
      bookListStored = bookList
      this.setState({
        bookList,
        dataSource: ds.cloneWithRows(bookList)
      })
    }).catch((e) => {
      Alert.alert(`${e}`)
    })
  }

  _onSearch = (text) => {
    const REG = new RegExp(`.*${text}.*`, "i")
    let bookList = bookListStored.filter((book) => (book.bookName && REG.test(book.bookName)))
    this.setState({
      bookList,
      dataSource: ds.cloneWithRows(bookList)
    })

    if(text.length === 0) {
      this.refs.searchBar.blur();
    }
  }

  _onPressSearchButton = () => {
    this.refs.searchBar.blur();
  }

  render() {
    const {dataSource} = this.state

    if (bookListStored.length) {
      return (
        <View style={style.container}>
          <SearchBar placeholder={"Search"} ref="searchBar" autoCapitalize={'none'} onChangeText={this._onSearch} onSearchButtonPress={this._onPressSearchButton} />
          <ListView
            enableEmptySections={true}
            dataSource={dataSource}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
            renderRow={(book, sectionID, rowID) => <BookItem key={book.id} book={book} status={book.status} navigator={this.props.navigator}
                                                             onDelete={this._onDelete(rowID)}/>}
          />
        </View>
      )
    } else {
      return (
        <View style={[style.container, style.noRecordView]}>
          <Text style={style.noRecordText}>No Record.</Text>
        </View>
      )
    }
  }
}

export default connect(({user}) => ({user}), null)(BookList)

const style = StyleSheet.create({
  container: {
    flexGrow: 1,
    bottom: 50,
    marginTop: 50
  },
  noRecordView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noRecordText: {
    color: '#ccc'
  }
})