import { GET, POST, DELETE } from '../utils/ifetch'

export const getMyBooks = async () => {
  let rs = await GET('/books');
  return rs.result;
}

export const addBook = async (book) => {
  let rs = await POST('/books', book);
  return rs.result;
}

export const removeBook = async (id) => {
  let rs = await DELETE('/books', id);
  return rs.result;
}