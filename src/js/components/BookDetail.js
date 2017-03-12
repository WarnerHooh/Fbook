import React, {Component} from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default ({bookData}) => (
    <ScrollView>
      <View style={{backgroundColor: "darkred"}}>
        <View style={{alignSelf: 'center', top: 60}}>
          <Image
            style={{width: 100, height: 150}}
            source={bookData.imageUrl ? {uri: bookData.imageUrl} : require('../../image/onloading.jpg')}/>
        </View>
      </View>
      <View style={styles.textBox}>
        <Text style={styles.title}>{bookData.bookName}</Text>
        <Text style={styles.author}>{bookData.author}</Text>
        <Text style={styles.description}>{bookData.brief}</Text>
      </View>
    </ScrollView>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textBox: {
    marginTop: 100,
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