import React, {Component} from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';

import onloadingPic from '../../image/onloading.jpg'

export default class BookInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bookData: {
        subtitle: 'book name'
      }
    };
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
      <View style={{flex: 1, flexDirection: 'column', height: 500, alignSelf: 'stretch'}}>
        <View style={{backgroundColor: "darkred", flex: 0.5, zIndex: 1}}>
          <View style={{flex: 1, alignSelf: 'center', top: 50}}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textBox: {
    top: 100,
    flex: 1,
    zIndex: 0
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
