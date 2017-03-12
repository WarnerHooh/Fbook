import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TextInput
} from 'react-native';

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {text: 'ISBN'};
  }

  _onButtonPress = ()=> {
    const {navigator} = this.props;
    navigator.push({
      pageComponent: Book,
      data: {isbn: this.state.text}
    })
  }

  render() {
    return (
      <View style={styles.container}>

        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Button
          onPress={this._onButtonPress.bind(this)}
          title="Search"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 200,
    alignSelf: 'center',
  }
});