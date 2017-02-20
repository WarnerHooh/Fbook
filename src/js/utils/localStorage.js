import { AsyncStorage } from 'react-native'

import { updateUser } from '../actions/user'
import { updateCookie } from '../actions/douban'

export const saveToLocalState = (data) => {
  if(data !== null) {
    Object.keys(data).forEach((k) => {
      AsyncStorage.setItem(k, JSON.stringify(data[k]));
    })
  }
}

export const loadLocalState = async ({dispatch}) => {
  let user = await AsyncStorage.getItem('user');
  let douban = await AsyncStorage.getItem('douban');

  if(user !== null) {
    let json = JSON.parse(user);
    dispatch(updateUser(json));
  }

  if(douban !== null) {
    let json = JSON.parse(douban);
    dispatch(updateCookie(json));
  }
}

export const clearLocalState = async ({dispatch}) => {
  let user = await AsyncStorage.removeItem('user');
  let douban = await AsyncStorage.removeItem('douban');
  dispatch(updateUser({}));
  dispatch(updateCookie({}));
}