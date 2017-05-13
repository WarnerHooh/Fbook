import React, { Component } from 'react'
import {
  StyleSheet,
  ListView,
  View,
  Text,
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
      bookList: [],
      dataSource: ds.cloneWithRows([])
    };
  }

  componentWillMount() {
    getMyBooks(this.props.user.id).then((bookList) => {
      bookListStored = bookList
      this.setState({
        bookList,
        dataSource: ds.cloneWithRows(bookList)
      })
    }).catch((e) => {
      Alert.alert('Error', `${e}`)
      // this.props.navigator.pop();
    })
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
  }

  render() {
    const {bookList, dataSource} = this.state
    if (bookList.length) {
      return (
        <View style={style.container}>
          <Header title="Owned Books"/>
          <SearchBar placeholder={"Search"} autoCapitalize={'none'} onChangeText={::this._onSearch}/>
          <ListView
            enableEmptySections={true}
            dataSource={dataSource}
            renderRow={(book, sectionID, rowID) => <BookItem key={book.id} book={book} navigator={this.props.navigator}
                                                             onDelete={::this._onDelete(rowID)}/>}
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
    bottom:50,
  },
  noRecordView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noRecordText: {
    color: '#ccc'
  }
})