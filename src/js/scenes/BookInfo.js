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
import onloadingPic from '../../image/onloading.jpg'
import colorStyle from '../../style/color'
import { addBook, markAsRead } from '../actions/book'

class BookInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bookData: props.bookData || {},
      isSaved: props.isSaved,
      isRead: false
    };

    this.props.navigator.setOnNavigatorEvent(::this.onNavigatorEvent);

    this.props.navigator.setButtons({
      leftButtons: [
        {
          title: 'Back',
          id: this.props.isbn ? 'goHome' : 'goBack'
        }
      ]
    })
  }

  // static navigatorButtons = {
  //   leftButtons: [
  //     {
  //       title: 'Back',
  //       id: this.props.isbn ? 'goHome' : 'goBack'
  //     }
  //   ]
  // }

  onNavigatorEvent(event) {
    if (event.id === 'goHome') {
      this.props.navigator.resetTo({
        screen: 'fbook.HomeScene',
        animated: false
      });
    } else if (event.id === 'goBack') {
      this.props.navigator.pop();
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
      });
  }

  _markAsPossess = () => {
    if(this.props.token) {
      this.props.addBook.then(() => {
        this.setState({isSaved: true})
        Alert.alert('', 'Added to my book list');
      }).catch(() => {
        Alert.alert('', 'Add failed');
      })
    }
  }

  _markAsRead = () => {
    let {douban, bookData} = this.props;
    console.log(bookData)
    if(douban.dbcl2) {
      this.props.markAsRead(this.state.bookData.id, douban).then(() => {
        this.setState({isRead: true})
        Alert.alert('','已标记为已阅')
      }).catch(() => {
        Alert.alert('', 'Add failed');
      })
    }
  }

  componentWillMount() {
    let { isbn } = this.props
    isbn && this._getDataFromApi(isbn);
  }

  render() {
    let { token, douban } = this.props;
    let { isSaved, isRead } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView style={{/*marginTop:60*/}}>
          <View style={{backgroundColor: "darkred"}}>
            <View style={{alignSelf: 'center', top: 60}}>
              <Image
                style={{width: 100, height: 150}}
                source={this.state.bookData.imageUrl ? {uri: this.state.bookData.imageUrl} : onloadingPic}/>
            </View>
          </View>
          <View style={styles.textBox}>
            <Text style={styles.title}>{this.state.bookData.bookName}</Text>
            <Text style={styles.author}>{this.state.bookData.author}</Text>
            <Text style={styles.description}>{this.state.bookData.brief}</Text>
          </View>
        </ScrollView>

        { isSaved ? null : <View style={[styles.actionButton, {right: 160}]}>
          <ActionButton style={{backgroundColor: token ? '#FF4A6A' : '#ccc'}} text="存" onAction={::this._markAsPossess} />
        </View> }
        { isRead ? null : <View style={[styles.actionButton, {right: 30}]}>
          <ActionButton style={{backgroundColor: douban ? '#2E9968' : '#ccc'}} text="阅" onAction={::this._markAsRead} />
        </View> }
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
    position: 'absolute',
    bottom: 20
  }
});

const mapStateToProps = ({user, douban}) => ({
  token: user.token,
  douban
})

const mapDispatchToProps = (dispatch) => ({
  addBook: bindActionCreators(addBook, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(BookInfo)
