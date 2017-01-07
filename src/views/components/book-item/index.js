import React, { Component, PropTypes } from 'react';
import { Book } from 'src/core/books';
import BookForm from '../../components/book-form';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import MuiButton from '../../components/common/muiButton';
import ReactStars from 'react-stars';

export default class BookItem extends Component {
  static propTypes = {
    deleteBook: PropTypes.func.isRequired,
    book: PropTypes.instanceOf(Book).isRequired,
    updateBook: PropTypes.func.isRequired,
    location: PropTypes.string.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {editing: false};
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.book !== this.props.book ||
    nextState.editing !== this.state.editing;
  }

  handleDelete = () => {
    this.props.deleteBook(this.props.book);
  }

  handleEdit = () => {
    this.setState({editing: true});
  }

  handleSubmit = () => {
    if (this.state.editing) {
      const { book } = this.props;
      let title = this.refs.editBook.refs.title.getValue();
      let author = this.refs.editBook.refs.author.getValue();
      let rating = this.refs.editBook.refs.rating.state.value;
      let isPublic = this.refs.editBook.refs.toggle.state.isToggled;

      this.props.updateBook(book, {isPublic: isPublic, title: title, author: author, rating: rating, userID: book.userID});

      this.stopEditing();
    }
  }

  stopEditing = () => {
    this.setState({editing: false});
  }

  renderEditBooks = () => {
    return (
      <TableRowColumn style={{textAlign: 'right'}}>
        <MuiButton label='Edit' onTouchTap={this.handleEdit} />
        <MuiButton label='Delete' onTouchTap={this.handleDelete} />
      </ TableRowColumn>
    );
  }

  handleClose = () => {
    this.setState({editing: false});
  }

  render() {
    const { book } = this.props;

    return (
      <div>
      <Table selectable={false}>
      <TableBody displayRowCheckbox={false} showRowHover={true}>
        <TableRow>
          <TableRowColumn>
          <ReactStars
            count={5}
            size={24}
            value={book.rating}
            edit={false}
            color2={'#ffd700'} />
          </TableRowColumn>
          <TableRowColumn style={{textAlign: 'center'}}>
          {book.author}
          </TableRowColumn>
          <TableRowColumn style={{textAlign: 'center'}}>
          {book.title}
          </TableRowColumn>
          {this.props.location === '/my-books' ? this.renderEditBooks() : null}
        </TableRow>
      </TableBody>
      </Table>
      <BookForm
        title="Edit Book"
        open={this.state.editing}
        ref="editBook"
        cancelAction={this.handleClose}
        submitAction={this.handleSubmit}
        book={book}
        action="edit"
      />
      </div>
    );
  }
}
