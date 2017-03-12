import { GET, POST, DELETE } from '../utils/ifetch'

export const getMyBooks = async (userId) => {
  return await GET(`/user/${userId}/books`);
}

export const addBook = async (book) => {
  return await POST('/books', book);
}

export const removeBook = async (id) => {
  return await DELETE(`/books/${id}`);
}

export const searchBook = async (bookName) => {
  return await GET(`/books?name=${bookName}`)
}

export const borrowBook = async (params) => {
  return await POST('/records', params)
}
