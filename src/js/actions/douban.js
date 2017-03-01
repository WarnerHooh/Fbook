export const SIGNEDIN = 'DOUBAN_SIGNEDIN'
export const SIGNING = 'DOUBAN_SIGNING'
export const SIGNIN_ERROR = 'DOUBAN_SIGNIN_ERROR'
export const SET_VCODE = 'DOUBAN_SET_VCODE'
export const SET_COOKIE = 'DOUBAN_SET_COOKIE'

export const toSignIn = ({username, password, captchaSolution}) => {
  return async (dispatch, getState) => {
    let state = getState();
    console.log(state);
    let {captchaId} = state.douban.vcode;
    let {id} = state.user;

    dispatch(signing());
    // let response = await fetch('http://10.17.5.55:3000/user/douban/session', {
      let response = await fetch('http://45.78.48.184:3000/user/douban/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password, captchaSolution, captchaId, userId: id })
    })
    console.log(response);
    let json = await response.json()
    console.log({ username, password, captchaSolution, captchaId, userId: id });
    console.log(json);
    if(response.ok) {
      if(json.login !== false) {

        dispatch(signedIn())
        dispatch(updateCookie(json))
      } else {
        dispatch(signInWithError('error'))
        throw new Error('error')
      }
    } else {
      dispatch(signInWithError(json.message))
      throw new Error(json.message)
    }
  }
}

export const getVcode = () => async(dispatch) => {
  let response = await fetch('http://45.78.48.184:3000/douban/captcha');
  // let response = await fetch('http://10.17.5.55:3000/douban/captcha');

  let json = await response.json()
  if(response.ok) {
    dispatch(setVcode(json))
  } else {
    dispatch(signInWithError(json.message))
  }
}

export const markAsRead = async (bookId, douban) => {
  let response = await fetch('http://45.78.48.184:3000/douban/markBookAsRead' + bookId);
  // let response = await fetch('http://10.17.5.55:3000/douban/markBookAsRead/' + bookId);

  let json = await response.json()
  return json;
}

const setVcode = (payload) => ({
  type: SET_VCODE,
  payload
})

export const signedIn = () => {
  return {
    type: SIGNEDIN
  }
}

const signing = () => ({
  type: SIGNING
})

const signInWithError = (error) => {
  return {
    type: SIGNIN_ERROR,
    payload: `Login failed: ${error}`
  }
}

export const updateCookie = (payload) => {
  return {
    type: SET_COOKIE,
    payload
  }
}