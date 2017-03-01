import { AsyncStorage, Alert } from 'react-native'
import { purge } from '../store'

const API_SERVER = 'http://182.254.228.128:3000'

const assembleToken = async () => {
  let userState = await AsyncStorage.getItem('user')
  let user = JSON.parse(userState)
  return user ? user.token : null;
}

const fitURL = async (PATH) => {
  let URLParams = PATH.split('?')[1]
  let token = await assembleToken()

  if(token) {
    if(URLParams === undefined) {
      return `${API_SERVER}${PATH}?token=${token}`
    } else if(!(/token=[^&]+.*/.test(URLParams))) {
      return `${API_SERVER}${PATH}&token=${token}`
    }
  }

  return `${API_SERVER}${PATH}`
}

const filterResponse = async (response) => {
  // if(code == 4000) {
  //   Alert.alert('', 'Your account has been expired, please sign in again')
  // } else if(code != 2000) {
  //   throw new Error(message)
  // }
  let {status} = response,
      rs = null;
  if(status === 403) {
    purge()
    Alert.alert('Error', 'Your account has been expired, please sign in again')
  } else {
    rs = await response.json()
    if(status !== 200) {
      throw new Error(rs.message)
    }
  }
  return rs;
}

const generator = (type) => async (URL, params) => {
  let _URL = await fitURL(URL);
  let response;

  console.log(_URL)

  if(type === 'GET') {
    response = await fetch(_URL);
  } else {
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