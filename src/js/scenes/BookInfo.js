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
import { getUser } from '../actions/user'

class BookInfo extends Component {

  constructor(props) {
    super(props);

    const { user, bookData: { status, user_id }, bookRecord } = props

    let canReturn = false;
    if (bookRecord) {
      if (status && user.id === bookRecord.user.id) {
        canReturn = true;
      }
    }

    this.state = {
      showBorrow: !status && user.id !== user_id,
      showReturn: canReturn,
      bookOwner: props.bookOwner
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

  componentWillMount() {
    this._fetchBookOwner()
  }

  _returnBook = ()=> {
    const {bookRecord, bookData, user} = this.props;

    const { id } = bookRecord;

    returnBook({id, userId: user.id, bookId: bookData.id}).then(()=> {
      Alert.alert(`Book 『${bookData.bookName}』 returned`);
      this.setState({
        showReturn: false,
        showBorrow: true,
      })
    }).catch((e)=> {
      Alert.alert(`${e}`)
    })
  }

  _markAsBorrowed = () => {
    const {user, bookData} = this.props;
    const {id, bookName} = bookData;

    borrowBook({bookId: id, userId: user.id}).then(() => {
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
    const { bookData, bookOwner, user } = this.props

    if(bookOwner === undefined && bookData.userId) {
      if(bookData.userId === user.id) {
        this.setState({
          bookOwner: user
        })
      } else {
        getUser(bookData.userId).then((user) => {
          this.setState({
            bookOwner: user
          })
        })
      }
    }
  }

  render() {
    const {token, bookData, bookRecord} = this.props;

    const {showBorrow, showReturn, bookOwner} = this.state;

    return (
      <View style={styles.container}>
        <BookDetail bookData={bookData} bookOwner={bookOwner} bookRecord={bookRecord}/>

        { showBorrow ? <View style={styles.actionButtonView}>
          <ActionButton style={[styles.actionButton, {backgroundColor: token ? '#2E9968' : '#ccc'}]} text="借"
                        onAction={this._markAsBorrowed}/>
        </View> : null }

        { showReturn ? <View style={styles.actionButtonView}>
          <ActionButton style={[styles.actionButton, {backgroundColor: token ? '#2E9968' : '#ccc'}]} text="还"
                        onAction={this._returnBook}/>
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
  user: user,
})

const mapDispatchToProps = (dispatch) => ({
  addBook: bindActionCreators(addBook, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(BookInfo)
