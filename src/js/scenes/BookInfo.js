import React, {Component} from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';

import onloadingPic from '../../image/onloading.jpg'

export default class BookInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bookData: {
        subtitle: 'book name',
      }
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

  componentWillMount() {
    this._getDataFromApi(this.props.isbn);
  }

  render() {

    return (
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
    );
  }
}

const styles = StyleSheet.create({
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
  }
});
