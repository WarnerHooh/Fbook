import React, { Component } from 'react'
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
import { addBook, borrowBook, returnBook } from '../actions/book'

class BookInfo extends Component {

  constructor(props) {
    super(props);
    const {userId, bookData: {status, user_id}, bookRecord} = props

    let canReturn = false;
    if (bookRecord) {
      if (status && userId === bookRecord.user.id) {
        canReturn = true;
      }
    }
    this.state = {
      showBorrow: !status && userId !== user_id,
      showReturn: canReturn,
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

  _returnBook = ()=> {
    const {bookRecord, bookData} = this.props;

    const {id, user} = bookRecord;

    returnBook({id, userId: user.id, bookId: bookData.id}).then(()=> {
      Alert.alert(`Book 『${bookData.bookName}』 returned`);
      this.setState({
        showBorrow: true,
      })
    }).catch((e)=> {
      Alert.alert(`${e}`)
    })
  }

  _markAsBorrowed = () => {
    const {userId, bookData} = this.props;
    const {id, bookName} = bookData;

    borrowBook({bookId: id, userId}).then(() => {
      Alert.alert(`Book 『${bookName}』 borrowed`);
      this.setState({
        showBorrow: false,
        showReturn: true,
      })
    }).catch((e) => {
      Alert.alert(`${e}`)
    })
  }

  _fetchBookRecord = () => {

  }

  _fetchBookOwner = () => {

  }

  render() {
    let {token, bookData, bookOwner, bookRecord} = this.props;
    console.log(`bookRecord:${bookRecord}`)
    let {showBorrow, showReturn} = this.state;

    return (
      <View style={styles.container}>
        <BookDetail bookData={bookData} bookOwner={bookOwner} bookRecord={bookRecord}/>

        { showBorrow ? <View style={styles.actionButtonView}>
          <ActionButton style={[styles.actionButton, {backgroundColor: token ? '#2E9968' : '#ccc'}]} text="借"
                        onAction={::this._markAsBorrowed}/>
        </View> : null }

        { showReturn ? <View style={styles.actionButtonView}>
          <ActionButton style={[styles.actionButton, {backgroundColor: token ? '#2E9968' : '#ccc'}]} text="还"
                        onAction={::this._returnBook}/>
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
