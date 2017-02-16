export const getMyBooks = async (token) => {
  console.log(token)
  let response = await fetch('http://45.78.48.184:3000/books?token=' + token)
  let json = await response.json();
  return json.result;
}