import React, {Component} from 'react'
import {
  StyleSheet,
  ScrollView
} from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import BookItem from '../components/BookItem'
import { getMyBooks } from '../actions/book'

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookList: [{
        id: '1',
        isbn: '134',
        amount: 1,
        bookName: '深入浅出NodeJs',
        author: '张三',
        brief: '简介简介简介简介简介简介简介简介简介简介',
        imageUrl: 'https://facebook.github.io/react/img/logo_og.png'
      }, {
        id: '2',
        isbn: '134',
        amount: 1,
        bookName: '深入浅出NodeJs',
        author: '张三',
        brief: '简介简介简介简介简介简介简介简介简介简介',
        imageUrl: 'https://facebook.github.io/react/img/logo_og.png'
      }]
    };
  }

  componentWillMount() {
    getMyBooks(this.props.token).then((bookList) => {
      this.setState({
        bookList
      })
    })
  }

  render() {
    return (
      <ScrollView>
        {this.state.bookList.map((book) => {
          return <BookItem key={book.id} {...book} />
        })}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token
})

export default connect(mapStateToProps)(BookList)