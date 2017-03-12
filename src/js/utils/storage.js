import { AsyncStorage } from 'react-native'

export const getItem = async (key) => {
  let value = await AsyncStorage.getItem(key)
  return JSON.parse(value)
}

export const setItem = async (obj) => {
  AsyncStorage.multiSet(Object.keys[obj].map((k) => ([k, JSON.stringify(obj[k])])))
}