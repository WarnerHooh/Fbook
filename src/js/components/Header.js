import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    Button,
    StyleSheet
} from 'react-native';

export default class Header extends Component {

    _onPress = ()=>{
        const {navigator} = this.props;
        navigator.pop();
    }

    render() {
        return (
            <View style={styles.headerContainer}>
                <Button
                    title='< back'
                    color='black'
                    onPress={this._onPress.bind(this)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer:{
        flex:1,
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems:'center',
        height:20,
        backgroundColor: 'rgba(0,0,0,0)'
    }
});

