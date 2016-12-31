import React, {Component} from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';
import Header from './Header'

export default class Book extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bookData: {
        subtitle: 'book name'
      }
    };
  }

  _getDataFromApi = (isbn)=> {
    console.log('access-----------getData')
    const jsonData = fetch('https://api.douban.com/v2/book/isbn/9787115369093')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
    this.setState({bookData: jsonData})
  }

  render() {
    const book = {
      uri: 'https://img3.doubanio.com/lpic/s28259431.jpg',
      title: '重构',
      author: '马丁·福勒',
      description: '本书清晰揭示了重构的过程，解释了重构的原理和最佳实践方式，并给出了何时以及何地应该开始挖掘代码以求改善。书中给出了70 多个可行的重构，每个重构都介绍了一种经过验证的代码变换手法的动机和技术。本书提出的重构准则将帮助你一次一小步地修改你的代码，从而减少了开发过程中的风险。',
    }
    const {navigator} = this.props;
    return (
      <View style={{flex: 1, flexDirection: 'column', height: 500, alignSelf: 'stretch'}}>
        <View style={{backgroundColor: "darkred", flex: 0.5, zIndex: 1}}>
          <Header style={{zIndex: 1}} navigator={navigator}/>
          <View style={{flex: 1, alignSelf: 'center', top: 50}}>
            <Image
              style={{width: 100, height: 150}}
              source={{uri: book.uri}}/>
          </View>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.title}>{}</Text>
          <Text style={styles.author}>{book.author}</Text>
          <Text style={styles.description}>{book.description}</Text>
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
