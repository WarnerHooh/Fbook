import React, {Component} from 'react'
import {
  StyleSheet,
  ListView,
  View,
  Text,
  Alert
} from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ScrollableTabView from 'react-native-scrollable-tab-view'

import BookItem from '../components/BookItem'
import { getMyBooks, removeBook } from '../actions/book'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => (r1 !== r2) })

class BorowedLentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookList: [],
      dataSource: ds.cloneWithRows([])
    };
  }

  componentWillMount() {
    getMyBooks(1).then((bookList) => {
      this.setState({
        bookList,
        dataSource: ds.cloneWithRows(bookList)
      })
    }).catch((e) => {
      Alert.alert('Error', `${e}`)
      // this.props.navigator.pop();
    })
  }


  render() {
    const { bookList, dataSource } = this.state
      return (
        <ScrollableTabView style={[style.container, {paddingTop: 10}]}>
          <View tabLabel="Borrowed" style={style.container}>
            <ListView
              enableEmptySections={true}
              dataSource={dataSource}
              renderRow={(book, sectionID, rowID) => <BookItem key={book.id} book={book} navigator={this.props.navigator} />}
            />
          </View>

          <View tabLabel="Lent" style={style.container}>
            <ListView
              enableEmptySections={true}
              dataSource={dataSource}
              renderRow={(book, sectionID, rowID) => <BookItem key={book.id} book={book} navigator={this.props.navigator} />}
            />
          </View>
        </ScrollableTabView>
      )
  }
}

export default connect(({user}) => ({user}), null)(BorowedLentList)

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  noRecordView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noRecordText: {
    color: '#ccc'
  }
})