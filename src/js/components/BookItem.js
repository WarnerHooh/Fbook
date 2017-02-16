import React, {Component} from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'

export default ({bookName, imageUrl}) => {
  return (
    <View style={styles.bookItem}>
      <Image style={styles.bookPicture} source={{uri: imageUrl || ''}} />
      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{ bookName }</Text>

        <Text>
          <Text style={styles.bookLike}>
            <Icon name='heart-o' color='#a2a1b8' size={15} /> 15 Likes
          </Text>
          <Text>   </Text>
          <Text style={styles.bookComment}>
            <Icon name='commenting-o' color='#a2a1b8' size={15} /> 21 Comments
          </Text>
        </Text>
      </View>
    </View>
  );
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
