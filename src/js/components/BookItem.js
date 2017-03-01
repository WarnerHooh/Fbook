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

import Icon from 'react-native-vector-icons/FontAwesome'
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
    let {bookName, imageUrl, brief, author} = this.props;
    this.props.navigator.push({
      screen: 'fbook.BookInfoScene',
      title: 'book',
      passProps: {
        isSaved: true,
        bookData: {
          bookName, imageUrl, brief, author
        }
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
    let {id, bookName, imageUrl, onDelete} = this.props;
    let {likes, comments} = this.state;

    let swipeoutBtns = [
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
    ]

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
                      likes.status ? <Icon name='heart' color='#FF4A6A' size={15} /> : <Icon name='heart-o' color='#a2a1b8' size={15} />
                    }
                    <Text> {likes.count} Likes</Text>
                  </Text>
                  <Text>    </Text>
                  <Text style={styles.bookComment}>
                    <Icon name='commenting-o' color='#a2a1b8' size={15} />
                    <Text> {comments.count} Comments</Text>
                  </Text>
                </Text>
              </View>
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
  }
});
