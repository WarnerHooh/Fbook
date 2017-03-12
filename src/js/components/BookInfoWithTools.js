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

export default (BookInfo, {isSaved, isBorrowed}) => {
  return class extends Component {
    constructor() {
      super()
      this.state = {
        isSaved: false,
        isBorrowed: false
      }
    }

    render() {
      return (
        <View style={styles.container}>
          <BookInfo />

          { isSaved ? null : <View style={[styles.actionButton, {right: 160}]}>
            <ActionButton style={{backgroundColor: token ? '#FF4A6A' : '#ccc'}} text="存" onAction={::this._markAsPossess} />
          </View> }

          { isBorrowed ? null : <View style={[styles.actionButton, {right: 30}]}>
            <ActionButton style={{backgroundColor: douban ? '#2E9968' : '#ccc'}} text="借" onAction={::this._markAsRead} />
          </View> }
        </View>
      )
    }
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