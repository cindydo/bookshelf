import { createSelector } from 'reselect';


export function getBooks(state) {
  return state.books;
}

export function getCreatedBook(state) {
  return getBooks(state).created;
}

export function getBookList(state) {
  return getBooks(state).list;
}

export function getBookFilter(state) {
  return getBooks(state).filter;
}

export function getDeletedBook(state) {
  return getBooks(state).deleted;
}


//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getVisibleBooks = createSelector(
  getBookList,
  getBookFilter,
  (books, filter) => {
    switch (filter) {
      case 'active':
        return books.filter(book => !book.isPublic);

      case 'isPublic':
        return books.filter(book => book.isPublic);

      default:
        return books;
    }
  }
);
