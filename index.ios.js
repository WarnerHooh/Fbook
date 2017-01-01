/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import Scanner from './src/js/components/Scanner.js'
import Book from './src/js/components/Book'
import Home from './src/js/components/Home'

export default class Fbook extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{pageComponent: Home}}

        renderScene={(route, navigator)=> {
          const Page = route.pageComponent;
          return <Page
            navigator={navigator} data={route.data}/>
        }
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Fbook', () => Fbook);
