import React, { Component } from "react";
import { Dimensions, StyleSheet, Text, TouchableHighlight, View, Button } from "react-native";
import Camera from "react-native-camera";

export default class BadInstagramCloneApp extends Component {
  constructor(props) {
    super(props);

    this.state = {barcode: null};
  }

  _onBarCodeRead(rs) {
    this.setState({barcode: rs.data});
    this.props.handleScanSuccess(rs.data);
  }

  render() {
    let {barcode} = this.state;
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          onBarCodeRead={::this._onBarCodeRead}>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  preview: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flexGrow: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});