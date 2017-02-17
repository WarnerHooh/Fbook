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
import { addBook } from '../actions/book'

class BookInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bookData: {
        subtitle: 'book name',
      },
      isSaved: false,
      isRead: false
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
        this.setState({bookData: responseJson})
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _markAsPossess = () => {
    if(this.props.isSignedIn) {
      this.props.addBook(this.state.bookData).then(() => {
        this.setState({isSaved: true})
        Alert.alert('', 'Added to my book list');
      }).catch(() => {
        Alert.alert('', 'Add failed');
      })
    }
  }

  _markAsRead = () => {
    Alert.alert('','已标记为已阅')
  }

  componentWillMount() {
    this._getDataFromApi(this.props.isbn);
  }

  render() {
    let { isSignedIn } = this.props;
    let { isSaved, isRead } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView style={{/*marginTop:60*/}}>
          <View style={{backgroundColor: "darkred"}}>
            <View style={{alignSelf: 'center', top: 60}}>
              <Image
                style={{width: 100, height: 150}}
                source={this.state.bookData.images ? {uri: this.state.bookData.images.large} : onloadingPic}/>
            </View>
          </View>
          <View style={styles.textBox}>
            <Text style={styles.title}>{this.state.bookData.title}</Text>
            <Text style={styles.author}>{this.state.bookData.author ? this.state.bookData.author[0] : ''}</Text>
            <Text style={styles.description}>{this.state.bookData.summary ? this.state.bookData.summary : ''}</Text>
          </View>
        </ScrollView>

        { isSaved ? null : <View style={[styles.actionButton, {right: 160}]}>
          <ActionButton style={{backgroundColor: isSignedIn ? '#FF4A6A' : '#ccc'}} text="存" onAction={::this._markAsPossess} />
        </View> }
        { isRead ? null : <View style={[styles.actionButton, {right: 30}]}>
          <ActionButton style={{backgroundColor: isSignedIn ? '#2E9968' : '#ccc'}} text="阅" onAction={::this._markAsRead} />
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

const mapStateToProps = ({signIn, user}) => ({
  isSignedIn: signIn.isSignedIn,
  user
})

const mapDispatchToProps = (dispatch) => ({
  addBook: bindActionCreators(addBook, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(BookInfo)
