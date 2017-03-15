import { Alert, AsyncStorage } from 'react-native'
import { getState, purge } from '../store/index'

const API_SERVER = 'http://182.254.228.128:3000'

const fitPath = (params) => (PATH) => {
  if(!params) return PATH;

  let URLParams = PATH.split('?')[1],
    paramsStr = Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&')

  return PATH + (URLParams ? '&' : '?') + paramsStr
}

const assembleToken = (PATH) => {
  let {token} = getState('user')
  return token ? fitPath({token})(PATH) : PATH
}

const fitURL = (PATH) => {
  return `${API_SERVER}${PATH}`
}

const filterResponse = async (response) => {
  let rs = await response.json()
  console.log(rs)
  if(rs.code === '40001') {
    purge()
    Alert.alert('Error', 'Your account has been expired, please sign in again')
  } else if(rs.code !== '10000') {
    throw new Error(rs.message)
  }
  return rs.result;
}

const generator = (type) => async (PATH, params) => {
  let _URL = await assembleToken(PATH);
  let response;
  if(type === 'GET') {
    _URL = fitURL(fitPath(params)(_URL))
    console.log(_URL)
    response = await fetch(_URL);
  } else {
    _URL = fitURL(_URL)
    console.log(_URL)
    response = await fetch(_URL, {
      method: type,
      headers: {
        'Content-Type': 'application/json'
      },
      body: params && JSON.stringify(params)
    })
  }

  return await filterResponse(response)
}

export const GET = generator('GET')
export const POST = generator('POST')
export const PUT = generator('PUT')
export const DELETE = generator('DELETE')