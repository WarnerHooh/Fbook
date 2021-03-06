import { GET, POST, DELETE, PUT } from '../utils/ifetch'

export const getMyBooks = async(userId, params) => {
  return await GET(`/user/${userId}/books`, params);
}

export const addBook = async(book) => {
  return await POST('/books', book);
}

export const removeBook = async(id) => {
  return await DELETE(`/books/${id}`);
}

export const searchBook = async(bookName) => {
  return await GET(`/books?name=${bookName}`)
}

export const borrowBook = async(params) => {
  console.log(params)
  return await POST('/records', params)
}

export const borrowedBooks = async(params) => {
  return await GET(`/records`, params)
}

export const returnBook = async(params) => {
  console.log(`return books params:${JSON.stringify(params)}`)
  return await PUT(`/records`, params)
}
