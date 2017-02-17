export const getMyBooks = async (token) => {
  let response = await fetch('http://45.78.48.184:3000/books?token=' + token);
  let json = await response.json();
  console.log(json)
  return json.result;
}

export const addBook = ({isbn13, title, author, summary, image}) => async (dispatch, getState) => {
  let { user } = getState();
  let response = await fetch(
    'http://45.78.48.184:3000/book/add?token=' + user.token,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        isbn: isbn13,
        author: author[0],
        amount: 1,
        bookName: title,
        brief: summary,
        imageUrl: image
      })
    }
  );

  let json = await response.json();

  if(!response.ok) {
    throw new Error(json.message);
  }

  return json.result;
}