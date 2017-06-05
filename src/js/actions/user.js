import {  PUT } from '../utils/ifetch'

export const SET_USER = 'SET_USER'

export const setUser = (payload) => {
  return {
    type: SET_USER,
    payload
  }
}

export const updateUser = async(user) => {
  return await PUT('/user', user);
}