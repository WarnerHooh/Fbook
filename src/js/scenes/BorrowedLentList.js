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
import { borrowedBooks } from '../actions/book'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => (r1 !== r2) })

class BorowedLentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: ds.cloneWithRows([])
    };
  }

  componentWillMount() {
    const { id } = this.props.user
    borrowedBooks({userId: id}).then((recordList) => {
      console.log(recordList)
      this.setState({
        dataSource: ds.cloneWithRows(recordList)
      })
    }).catch((e) => {
      Alert.alert('Error', `${e}`)
    })
  }


  render() {
    const { dataSource } = this.state
    return (
      <ScrollableTabView style={[style.container, {paddingTop: 10}]}>
        <View tabLabel="Borrowed" style={style.container}>
          <ListView
            enableEmptySections={true}
            dataSource={dataSource}
            renderRow={({id, book, user, startTime, endTime}, sectionID, rowID) => <BookItem key={id} book={book} borrowRecord={{id, user, startTime, endTime}} ifRecord='false' navigator={this.props.navigator} />}
          />
        </View>

        <View tabLabel="Lent" style={style.container}>
          <ListView
            enableEmptySections={true}
            dataSource={dataSource}
            renderRow={(record, sectionID, rowID) => <BookItem key={record.id} book={record.book} navigator={this.props.navigator} />}
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