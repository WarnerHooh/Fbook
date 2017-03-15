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

import Loading from '../components/Loading'
import ActionButton from '../components/ActionButton'
import BookDetail from '../components/BookDetail'
import { addBook } from '../actions/book'

class ScanResult extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      bookData: {},
      isSaved: false,
    };

    this.props.navigator.setOnNavigatorEvent(::this.onNavigatorEvent);
  }

  static navigatorButtons = {
    leftButtons: [
      {
        title: 'Back',
        id: 'goHome'
      }
    ]
  }

  onNavigatorEvent(event) {
    if (event.id === 'goHome') {
      this.props.navigator.resetTo({
        screen: 'fbook.HomeScene',
        animated: false
      });
    }
  }

  _getDataFromApi = (isbn)=> {
    fetch('https://api.douban.com/v2/book/isbn/' + isbn)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({bookData: {
          isbn: responseJson.isbn13,
          imageUrl: responseJson.images.large,
          bookName: responseJson.title,
          author: responseJson.author[0],
          brief: responseJson.summary
        }})
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({
          isLoading: false
        })
      });
  }

  _markAsPossess = () => {
    addBook(this.state.bookData).then(() => {
      this.setState({isSaved: true})
      Alert.alert('', 'Added to my book list');
    }).catch(() => {
      Alert.alert('', `Book already existed`);
    })
  }

  componentWillMount() {
    let { isbn } = this.props
    isbn && this._getDataFromApi(isbn);
  }

  render() {
    let { token } = this.props;
    let { isLoading, isSaved } = this.state;

    return (
      <View style={styles.container}>
        <BookDetail bookData={this.state.bookData} />

        { isSaved ? null : <View style={styles.actionButton}>
          <ActionButton style={{backgroundColor: token ? '#FF4A6A' : '#ccc'}} text="存" onAction={::this._markAsPossess} />
        </View> }

        <Loading show={isLoading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textBox: {
    marginTop: 100
  },
  author: {
    alignSelf: 'center',
    paddingTop: 20,
    color: 'gray'
  },
  title: {
    alignSelf: 'center',
    fontSize: 25
  },
  description: {
    padding: 10,
    color: 'gray',
  },
  actionButton: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

const mapStateToProps = ({user}) => ({
  token: user.token,
})

export default connect(mapStateToProps)(ScanResult)
