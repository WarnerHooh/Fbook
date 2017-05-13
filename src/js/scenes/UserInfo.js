import React, {Component} from 'react'
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  Switch,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { toSignOut } from '../actions/signIn'
import imageStyle from '../../style/image'
import colorStyle from '../../style/color'
import ListItem from '../components/ListItem'

class UserInfo extends Component {

  constructor(props) {
    super(props);

    let {username, telephone, email, address} = props.user;
    this.state = {
      username, telephone, email, address
    };
  }

  _getDataFromApi = (isbn)=> {
    fetch('https://api.douban.com/v2/book/isbn/' + isbn)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({bookData: {
        }})
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _handleSignOut = () => {
    this.props.signOut();
    this.props.navigator.pop();
  }

  _handleChangeText = (name) => {
    return (text) => {
      this.setState({
        [name]: text
      })
    }
  }

  componentWillMount() {
  }

  render() {
    let {username, telephone, email, address} = this.state;
    return (
      <ScrollView>
        <Image source={require('../../image/user-bg.png')} style={imageStyle.backgroundImage}>
          <View style={styles.container}>
            <View style={styles.avatarBox}>
              <Image style={styles.avatar} source={require('../../image/react.png')} />
            </View>

            <View style={styles.infoBox}>
                <View style={{flex: 1, backgroundColor: '#fff'}}>
                  <ListItem label="Username">
                    <TextInput style={styles.textInput} value={username} onChangeText={this._handleChangeText('username')} />
                  </ListItem>

                  <ListItem label="Email">
                    <TextInput style={styles.textInput} value={email} onChangeText={this._handleChangeText('email')} />
                  </ListItem>

                  <ListItem label="Mobile">
                    <TextInput style={styles.textInput} value={telephone} onChangeText={this._handleChangeText('telephone')} />
                  </ListItem>

                  <ListItem label="Address">
                    <TextInput style={styles.textInput} value={address} onChangeText={this._handleChangeText('address')} />
                  </ListItem>

                  {/*<ListItem label="Facebook">*/}
                    {/*<View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>*/}
                      {/*<Switch*/}
                        {/*onValueChange={(value) => this.setState({falseSwitchIsOn: value})}*/}
                        {/*onTintColor='#FF4A6A'*/}
                        {/*style={styles.switcher}*/}
                        {/*value={this.state.falseSwitchIsOn} />*/}
                    {/*</View>*/}
                  {/*</ListItem>*/}
                </View>

                <View style={{flex: 1, borderTopWidth: 1, borderColor: '#eee', marginTop: 20}}>
                  <ListItem label="Sign Out" onPress={::this._handleSignOut} />
                </View>

              </View>
            </View>
        </Image>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#000',
    alignSelf: 'center',
    marginTop: 100,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowColor: '#fff',
    shadowRadius: 4,
    shadowOpacity: 0.5
  },
  infoBox: {
    marginTop: 50,
    backgroundColor: '#EFEFEF'
  },
  avatar: {
    width: 80,
    height: 80,
    overflow: 'hidden',
    borderRadius: 40
  },
  textInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    textAlign: 'right'
  },
  switcher: {
    marginTop: 4,
    transform: [{scale: 0.8}]
  }
});

const mapStateToProps = ({user}) => ({
  user
})

const mapDispatchToProps = (dispatch) => ({
  signOut: bindActionCreators(toSignOut, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
