import React, {Component} from 'react'
import {
  StyleSheet,
  ListView,
  View,
  Text,
  RefreshControl,
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
      refreshing: false,
      dataSource: ds.cloneWithRows([])
    };

    this._fetchData(props.user.id)
  }

  _fetchData = (userId) => {
    userId && borrowedBooks({userId, limit: 100}).then((recordList) => {
      this.setState({
        dataSource: ds.cloneWithRows(recordList)
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

  componentWillReceiveProps(nextProps) {
    const userId = nextProps.user.id

    if(this.props.user.id !== userId) {
      this._fetchData(userId)
    } else {
      this.setState({
        dataSource: ds.cloneWithRows([])
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
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          renderRow={({id, book, status, ...rest}, sectionID, rowID) => <BookItem key={id} status={status} book={book} bookRecord={{id, ...rest}} navigator={this.props.navigator} />}
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