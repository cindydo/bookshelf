import { List, Record } from 'immutable';

import {
  SIGN_OUT_SUCCESS
} from 'src/core/auth';

import {
  CREATE_BOOK_SUCCESS,
  DELETE_BOOK_SUCCESS,
  FILTER_BOOKS,
  LOAD_BOOKS_SUCCESS,
  UPDATE_BOOK_SUCCESS
} from './action-types';


export const BooksState = new Record({
  created: null,
  deleted: null,
  filter: '',
  list: new List(),
  previous: null
});


export function booksReducer(state = new BooksState(), {payload, type}) {
  switch (type) {
    case CREATE_BOOK_SUCCESS:
      return state.merge({
        created: payload,
        deleted: null,
        previous: null,
        list: state.deleted && state.deleted.key === payload.key ?
              state.previous :
              state.list.unshift(payload)
      });

    case DELETE_BOOK_SUCCESS:
      return state.merge({
        deleted: payload,
        previous: state.list,
        list: state.list.filter(book => book.key !== payload.key)
      });

    case FILTER_BOOKS:
      return state.set('filter', payload.filterType || '');

    case LOAD_BOOKS_SUCCESS:
      return state.set('list', new List(payload.reverse()));

    case UPDATE_BOOK_SUCCESS:
      return state.merge({
        created: null,
        deleted: null,
        previous: null,
        list: state.list.map(book => {
          return book.key === payload.key ? payload : book;
        })
      });

    case SIGN_OUT_SUCCESS:
      return new BooksState();

    default:
      return state;
  }
}
