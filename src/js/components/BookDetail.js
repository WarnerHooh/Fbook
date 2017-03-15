import React, {Component} from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import moment from 'moment'

const BookOwner = ({owner}) => {
  if(owner) {
    return (
      <View style={{top: 78, right: 40, position:'absolute', alignItems: 'center'}}>
        <View style={{width: 60, height:60, backgroundColor:'#ccc', borderRadius: 30, overflow:'hidden', borderColor: '#fff', borderWidth: 1}}>
        </View>
        <View>
          <Text style={{fontSize: 12}}>{owner.username}</Text>
        </View>
      </View>
    )
  }

  return null;
}

const BookBorrower = ({user, startTime}) => {
  if(user) {
    return (
      <Text style={{paddingHorizontal: 10, marginBottom: 16}}>
        <Text style={{color: '#f00'}}>{user.username}</Text>
        <Text> borrowed this book at </Text>
        <Text style={{color: '#f00'}}>{moment(startTime).format('YYYY-MM-DD hh:mm:ss')}</Text>
      </Text>
    )
  }

  return null;
}

export default ({bookData, bookOwner, borrowRecord}) => {
  return (
    <ScrollView>
      <View style={{backgroundColor: "darkred", flexDirection: 'row'}}>
        <View style={{alignSelf: 'center', top: 60, flex:1, flexDirection:'row', backgroundColor:'transparent', justifyContent: 'center'}}>
          <Image
            style={{width: 100, height: 150}}
            source={bookData.imageUrl ? {uri: bookData.imageUrl} : require('../../image/onloading.jpg')}/>
          <BookOwner owner={bookOwner} />
        </View>
      </View>
      <View style={styles.textBox}>
        <BookBorrower {...borrowRecord} />

        <Text style={styles.title}>{bookData.bookName}</Text>
        <Text style={styles.author}>{bookData.author}</Text>
        <Text style={styles.description}>{bookData.brief}</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textBox: {
    marginTop: 90,
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