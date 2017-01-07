import { getDeletedBook, getCreatedBook } from './selectors';
import { bookList } from './book-list';
import { BOOKS_PATH, PUBLIC_BOOKS_PATH } from '../firebase/firebase-paths';
import { CREATE_BOOK_ERROR, CREATE_BOOK_SUCCESS, DELETE_BOOK_ERROR, DELETE_BOOK_SUCCESS, LOAD_BOOKS_SUCCESS, FILTER_BOOKS, UPDATE_BOOK_ERROR, UPDATE_BOOK_SUCCESS, UNDELETE_BOOK_ERROR, UNLOAD_BOOKS_SUCCESS } from './action-types';


export function createBook(isPublic, title, author, rating) {
  return (dispatch, getState) => {
    const { auth } = getState();
    const userID = auth.id;
    bookList.push({isPublic: isPublic, title, author, userID: userID, rating: rating})
      .catch(error => dispatch(createBookError(error)));
    const book = getCreatedBook(getState());
    bookList.update(book, {isPublic: isPublic, title, author, userID: userID, rating: rating})
      .catch(error => dispatch(createBookError(error)));
  };
}

export function createBookError(error) {
  return {
    type: CREATE_BOOK_ERROR,
    payload: error
  };
}

export function createBookSuccess(book) {
  return {
    type: CREATE_BOOK_SUCCESS,
    payload: book
  };
}

export function deleteBook(book) {
  return (dispatch, getState) => {
    const { auth } = getState();
    bookList.path = PUBLIC_BOOKS_PATH;
    bookList.remove(book.key)
      .catch(error => dispatch(deleteBookError(error)));
    bookList.path = `${BOOKS_PATH}/${auth.id}`;
    bookList.remove(book.key)
      .catch(error => dispatch(deleteBookError(error)));
  };
}

export function deleteBookError(error) {
  return {
    type: DELETE_BOOK_ERROR,
    payload: error
  };
}

export function deleteBookSuccess(book) {
  return {
    type: DELETE_BOOK_SUCCESS,
    payload: book
  };
}

export function undeleteBook() {
  return (dispatch, getState) => {
    const book = getDeletedBook(getState());
    if (book) {
      bookList.set(book.key, {isPublic: book.isPublic, title: book.title, author: book.author, rating: book.rating, userID: book.userID})
        .catch(error => dispatch(undeleteBookError(error)));
    }
  };
}

export function undeleteBookError(error) {
  return {
    type: UNDELETE_BOOK_ERROR,
    payload: error
  };
}

export function updateBookError(error) {
  return {
    type: UPDATE_BOOK_ERROR,
    payload: error
  };
}

export function updateBook(book, changes) {
  return dispatch => {
    bookList.update(book, changes)
      .catch(error => dispatch(updateBookError(error)));
  };
}

export function updateBookSuccess(book) {
  return {
    type: UPDATE_BOOK_SUCCESS,
    payload: book
  };
}

export function loadBooksSuccess(books) {
  return {
    type: LOAD_BOOKS_SUCCESS,
    payload: books
  };
}

export function filterBooks(filterType) {
  return {
    type: FILTER_BOOKS,
    payload: {filterType}
  };
}

export function loadBooks(path) {
  return (dispatch, getState) => {
    const { auth } = getState();
    if (path === BOOKS_PATH) {
      bookList.path = `${path}/${auth.id}`;
    } else if (path === PUBLIC_BOOKS_PATH) {
      bookList.path = PUBLIC_BOOKS_PATH;
    }
    bookList.subscribe(dispatch);
  };
}

export function unloadBooks() {
  bookList.unsubscribe();
  return {
    type: UNLOAD_BOOKS_SUCCESS
  };
}
