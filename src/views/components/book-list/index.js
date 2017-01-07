import React, { PropTypes, Component } from 'react';
import { List } from 'immutable';
import BookItem from '../book-item';
import { Table, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';


export default class BookList extends Component {
  static propTypes = {
    deleteBook: PropTypes.func.isRequired,
    books: PropTypes.instanceOf(List).isRequired,
    updateBook: PropTypes.func.isRequired,
    location: PropTypes.string.isRequired
  }
  constructor(props) {
    super(props);
  }

  render() {
    let bookItems = this.props.books.map((book, index) => {
      return (
        <BookItem
        deleteBook={this.props.deleteBook}
        key={index}
        book={book}
        updateBook={this.props.updateBook}
        location={this.props.location}
        />
      );
    });
    let bookActions = '';
    if (this.props.location === '/my-books') {
      bookActions = (<TableHeaderColumn style={{textAlign: 'right'}}/>);
    }

    return (
      <div>
      <Table fixedHeader={true} selectable={false}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
        <TableHeaderColumn>Rating</TableHeaderColumn>
        <TableHeaderColumn style={{textAlign: 'center'}}>Author</TableHeaderColumn>
        <TableHeaderColumn style={{textAlign: 'center'}}>Book Title</TableHeaderColumn>
        {bookActions}
        </TableRow>
      </TableHeader>
      </Table>
      {bookItems}
      </div>
    );
  }
}
