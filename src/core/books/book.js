import { Record } from 'immutable';


export const Book = new Record({
  isPublic: false,
  key: null,
  title: null,
  author: null,
  rating: null,
  userID: null
});
