import React, {Component} from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Alert,
  Easing,
  Animated
} from 'react-native'
import Swipeout from 'react-native-swipeout'

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import IonicIcon from 'react-native-vector-icons/Ionicons'
import reactLogo from '../../image/react.png'

export default class BookItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      likes: {
        count: 15,
        status: false
      },
      comments: {
        count: 12
      }
    }
    this.animationValue = new Animated.Value(0);
  }

  _onPress = () => {
    let {book, bookOwner, borrowRecord} = this.props;
    console.log('on pressed....')
    this.props.navigator.push({
      screen: 'fbook.BookInfoScene',
      title: 'book',
      passProps: {
        isSaved: true,
        bookData: book,
        bookOwner,
        borrowRecord
      }
    })
  }

  _onToggleLike = () => {
    let { likes: { count, status } } = this.state
    this.setState({
      likes: {
        count: status ? --count : ++count,
        status: !status
      }
    })
  }

  _animationStart = () => {
    Animated.timing(
      this.animationValue,
      {
        toValue: 1,
        duration: 300,
      }
    ).start()
  }

  render() {
    let {id, bookName, imageUrl, status} = this.props.book;
    let {onDelete} = this.props;
    let {likes, comments} = this.state;

    let swipeoutBtns = (!status && onDelete) ? [
      {
        text: 'Delete',
        color: 'white',
        backgroundColor: 'red',
        underlayColor: 'red',
        onPress: () => {
          this._animationStart()
          onDelete(id)
        }
      }
    ] : null

    const animationHeight = this.animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [96, 0]
    }),
          animationOpacity = this.animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    });

    return (
      <Animated.View style={{
        height: animationHeight,
        opacity: animationOpacity
      }}>
        <Swipeout right={swipeoutBtns}>
          <TouchableWithoutFeedback onPress={::this._onPress}>
            <View style={[styles.bookItem]}>
              <Image style={styles.bookPicture} source={ imageUrl ? {uri: imageUrl} : reactLogo } />
              <View style={styles.bookDetails}>
                <Text style={styles.bookTitle}>{ bookName }</Text>

                <Text>
                  <Text style={styles.bookLike} onPress={::this._onToggleLike}>
                    {
                      likes.status ? <FontAwesomeIcon name='heart' color='#FF4A6A' size={15} /> : <FontAwesomeIcon name='heart-o' color='#a2a1b8' size={15} />
                    }
                    <Text> {likes.count} Likes</Text>
                  </Text>
                  <Text>    </Text>
                  <Text style={styles.bookComment}>
                    <FontAwesomeIcon name='commenting-o' color='#a2a1b8' size={15} />
                    <Text> {comments.count} Comments</Text>
                  </Text>
                </Text>
              </View>
              { !status ? null : <IonicIcon name="ios-clock-outline" color="#f00" size={20} style={styles.clock} /> }
            </View>
          </TouchableWithoutFeedback>
        </Swipeout>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  textBox: {
    marginTop: 100
  },
  bookItem: {
    backgroundColor: '#fff',
    padding: 8,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row'
  },
  bookPicture: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  bookDetails: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  bookTitle: {
    fontSize: 18,
  },
  bookLike: {
    color: '#a2a1b8',
  },
  bookComment: {
    color: '#a2a1b8',
    marginLeft: 20
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
  clock: {
    marginLeft: 5
  }
});
