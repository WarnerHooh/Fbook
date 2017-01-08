import React, {Component} from 'react'
import {View, Text, Image, Dimensions, StyleSheet} from 'react-native'

import Scanner from '../components/Scanner'
import Book from './BookInfo'
import ScanningBackground from '../../image/scanning-bg.png'

export default class extends Component {

  _handleScanSuccess = (isbn)=> {
    this.props.navigator.push({
      component: Book,
      title: 'book info',
      passProps:{
        isbn:isbn
      }
    });
  }

  render() {
    return (
      <View style={ style.container }>
        <Scanner style={ style.scanner } handleScanSuccess={::this._handleScanSuccess}/>

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
    marginTop: 64,
    flex: 1,
    alignItems: 'flex-end',
    overflow: 'hidden'
  },

  scanner: {
    flex: 1,
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