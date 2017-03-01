import React, {Component} from 'react'
import {
  StyleSheet,
  ListView,
  View,
  Alert
} from 'react-native';
import SearchBar from 'react-native-search-bar';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import BookItem from '../components/BookItem'
import { getMyBooks, removeBook } from '../actions/book'
import { toSignOut } from '../actions/signIn'
import { iconsMap, iconsLoaded } from '../utils/appIcons'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => (r1 !== r2) })

let bookListStored = [];

class BookList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookList: [],
      dataSource: ds.cloneWithRows([])
    };

    this.props.navigator.setOnNavigatorEvent(::this._onNavigatorEvent)
    iconsLoaded.then(() => {
      this.props.navigator.setButtons({
        rightButtons: [{
          icon: iconsMap['sign-out'],
          id: 'signOut'
        }]
      })
    })
  }

  componentWillMount() {
    getMyBooks().then((bookList) => {
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

  _onNavigatorEvent = (event) => {
    if (event.id === 'signOut') {
      this.props.signOut();
      this.props.navigator.pop();
    }
  }

  _onDelete = (index) => (id) => {
    // Alert.alert(`${id}`)
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
    return (
      <View>
        <SearchBar
          placeholder={"Search"}
          autoCapitalize={'none'}
          onChangeText={::this._onSearch}
        />
        <ListView
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={(book, sectionID, rowID) => <BookItem key={book.id} {...book} navigator={this.props.navigator} onDelete={::this._onDelete(rowID)} />}
          />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
  signOut: bindActionCreators(toSignOut, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(BookList)