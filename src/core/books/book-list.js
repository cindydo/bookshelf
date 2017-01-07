import { FirebaseList } from 'src/core/firebase';
import * as bookActions from './actions';
import { Book } from './book';


export const bookList = new FirebaseList({
  onAdd: bookActions.createBookSuccess,
  onChange: bookActions.updateBookSuccess,
  onLoad: bookActions.loadBooksSuccess,
  onRemove: bookActions.deleteBookSuccess
}, Book);
