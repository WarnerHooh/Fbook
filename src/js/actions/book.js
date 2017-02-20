export const getMyBooks = async (token) => {
  let response = await fetch('http://45.78.48.184:3000/books?token=' + token);
  // TODO when token expired
  if(!response.ok) {
    throw new Error('');
  }
  let json = await response.json();
  return json.result;
}

export const addBook = (book) => async (dispatch, getState) => {
  let { user } = getState();

  let response = await fetch(
    'http://45.78.48.184:3000/book/add?token=' + user.token,
    // 'http://10.17.5.55:3000/book/add?token=' + user.token,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    }
  );

  let json = await response.json();

  if(!response.ok) {
    throw new Error(json.message);
  }

  return json.result;
}