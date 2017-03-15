import React, {Component} from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ActionButton from '../components/ActionButton'
import BookDetail from '../components/BookDetail'
import onloadingPic from '../../image/onloading.jpg'
import { addBook, borrowBook } from '../actions/book'

class BookInfo extends Component {

  constructor(props) {
    super(props);
    const {userId, bookData: {status, user_id}} = props
    this.state = {
      showBorrow: !status && userId != user_id
    };

    // this.props.navigator.setOnNavigatorEvent(::this.onNavigatorEvent);
  }

  // static navigatorButtons = {
  //   leftButtons: [
  //     {
  //       title: 'Back',
  //       id: 'goBack'
  //     }
  //   ]
  // }
  //
  // onNavigatorEvent(event) {
  //   if (event.id === 'goBack') {
  //     this.props.navigator.pop();
  //   }
  // }

  _markAsBorrowed = () => {
    const { userId, bookData } = this.props
    const { id, bookName } = bookData

    borrowBook({bookId: id, userId}).then(() => {
      Alert.alert(`Book 『${bookName}』 borrowed`);
      this.setState({
        showBorrow: false
      })
    }).catch((e) => {
      Alert.alert(`${e}`)
    })
  }

  render() {
    let { token, bookData, bookOwner, borrowRecord } = this.props;
    let { showBorrow } = this.state;

    return (
      <View style={styles.container}>
        <BookDetail bookData={bookData} bookOwner={bookOwner} borrowRecord={borrowRecord} />

        { showBorrow ? <View style={styles.actionButtonView}>
          <ActionButton style={[styles.actionButton, {backgroundColor: token ? '#2E9968' : '#ccc'}]} text="借" onAction={::this._markAsBorrowed} />
        </View> : null }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actionButtonView: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  actionButton: {
    marginRight: 20
  }
});

const mapStateToProps = ({user}) => ({
  token: user.token,
  userId: user.id
})

const mapDispatchToProps = (dispatch) => ({
  addBook: bindActionCreators(addBook, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(BookInfo)
