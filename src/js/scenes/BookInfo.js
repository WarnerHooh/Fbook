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
import colorStyle from '../../style/color'
import { addBook, borrowBook } from '../actions/book'

class BookInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isBorrowed: false
    };

    this.props.navigator.setOnNavigatorEvent(::this.onNavigatorEvent);
  }

  static navigatorButtons = {
    leftButtons: [
      {
        title: 'Back',
        id: 'goBack'
      }
    ]
  }

  onNavigatorEvent(event) {
    if (event.id === 'goBack') {
      this.props.navigator.pop();
    }
  }

  _markAsBorrowed = () => {
    const { id, bookName, user_id } = this.props.bookData

    borrowBook({bookId: id, userId: user_id}).then(() => {
      Alert.alert(`Book 『${bookName}』 borrowed`);
      this.setState({
        isBorrowed: true
      })
    }).catch((e) => {
      Alert.alert(`${e}`)
    })
  }

  render() {
    let { token, bookData } = this.props;
    let { isBorrowed } = this.state;

    return (
      <View style={styles.container}>
        <BookDetail bookData={bookData} />

        { isBorrowed ? null : <View style={styles.actionButton}>
          <ActionButton style={{backgroundColor: token ? '#2E9968' : '#ccc', marginRight: 20}} text="借" onAction={::this._markAsBorrowed} />
        </View> }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actionButton: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});

const mapStateToProps = ({user}) => ({
  token: user.token,
})

const mapDispatchToProps = (dispatch) => ({
  addBook: bindActionCreators(addBook, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(BookInfo)
