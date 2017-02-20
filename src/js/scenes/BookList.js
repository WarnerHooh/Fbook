import React, {Component} from 'react'
import {
  StyleSheet,
  ScrollView
} from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import BookItem from '../components/BookItem'
import { getMyBooks } from '../actions/book'
import { toSignOut } from '../actions/signIn'
import { clearLocalState } from '../utils/localStorage'
import { iconsMap, iconsLoaded } from '../utils/appIcons'

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookList: []
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
    getMyBooks(this.props.token).then((bookList) => {
      this.setState({
        bookList
      })
    }).catch((e) => {
      // TODO when token expired
      clearLocalState({dispatch: this.props.dispatch});
      console.log(e)
      this.props.navigator.pop();
    })
  }

  _onNavigatorEvent = (event) => {
    if (event.id === 'signOut') {
      this.props.signOut();
      this.props.navigator.pop();
    }
  }

  render() {
    return (
      <ScrollView>
        {this.state.bookList.map((book) => {
          return <BookItem key={book.id} {...book} navigator={this.props.navigator} />
        })}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token
})

const mapDispatchToProps = (dispatch) => ({
  signOut: bindActionCreators(toSignOut, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(BookList)