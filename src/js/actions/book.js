import { GET, POST, DELETE } from '../utils/ifetch'

export const getMyBooks = async () => {
  return await GET('/books');
}

export const addBook = async (book) => {
  return await POST('/books', book);
}

export const removeBook = async (id) => {
  return await DELETE(`/books/${id}`);
}