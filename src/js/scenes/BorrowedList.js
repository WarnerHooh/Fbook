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
import Header from '../components/Header'

import BookItem from '../components/BookItem'
import { borrowedBooks } from '../actions/book'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => (r1 !== r2) })

class BorowedLentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: ds.cloneWithRows([])
    };

    this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent);
  }

  _onNavigatorEvent = (event) => {
    if (event && event.id === 'bottomTabSelected') {

      const userId = this.props.user.id

      userId && borrowedBooks({userId}).then((recordList) => {
        console.log(recordList)
        this.setState({
          dataSource: ds.cloneWithRows(recordList)
        })
      }).catch((e) => {
        Alert.alert('Error', `${e}`)
      })
    }
  }


  render() {
    const { dataSource } = this.state
    return (
      <View tabLabel="Borrowed" style={style.container}>
        <ListView style={style.listView}
          enableEmptySections={true}
          dataSource={dataSource}
          renderRow={({id, book, user, startTime, endTime}, sectionID, rowID) => <BookItem key={id} book={book} borrowRecord={{id, user, startTime, endTime}} ifRecord='false' navigator={this.props.navigator} />}
        />
      </View>
    )
  }
}

export default connect(({user}) => ({user}), null)(BorowedLentList)

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30
  },
  listView: {
    marginTop: -30
  },
  noRecordView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noRecordText: {
    color: '#ccc'
  }
})