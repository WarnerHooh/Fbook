import React, {Component} from 'react'
import {View, Text, Image, Dimensions, StyleSheet} from 'react-native'

import Scanner from '../components/Scanner'
import Book from './BookInfo'
import ScanningBackground from '../../image/scanning-bg.png'

export default class extends Component {

  _handleScanSuccess = ()=> {
    let flag = false;

    return (isbn) => {
      !flag && this.props.navigator.resetTo({
        screen: 'fbook.BookInfoScene',
        title: 'Book info',
        passProps: {
          isbn: isbn
        }
      });

      flag = true;
    }
  }

  testPress() {
    this.props.navigator.resetTo({
      screen: 'fbook.BookInfoScene',
      title: 'Book info',
      passProps: {
        isbn: '9787506365413'
      }
    }, 1);
  }

  render() {
    return (
      <View style={ style.container }>
        <Scanner style={ style.scanner } handleScanSuccess={::this._handleScanSuccess()}/>

        <View style={ style.desc }>
          <Text style={ style.tips }>Align QR code/barcode within frame to scan</Text>
          <Text style={ style.tips }>My QR Code</Text>
        </View>
        <Image source={ScanningBackground} style={style.scanningBackground} />
      </View>
    )
  }
}

const windowWidth = Dimensions.get('window').width,
      windowHeight = Dimensions.get('window').height,
      scannerHeight = windowWidth / 375  * 800;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
    overflow: 'hidden',
  },

  scanner: {
    marginTop: 100,
    paddingHorizontal: 100
  },

  desc: {
    position: 'absolute',
    bottom: 130,
    left: 0,
    width: windowWidth,
    backgroundColor: 'transparent',
    alignItems: 'center'
  },

  tips: {
    color: '#fff'
  },

  img: {
    width: windowWidth,
    height: windowHeight,
    position: 'absolute'
  },

  scanningBackground: {
    width: windowWidth,
    height: scannerHeight,
    position: 'absolute'
  }
})