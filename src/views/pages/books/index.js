/* es-lint disable */
import { List } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getNotification, notificationActions } from 'src/core/notification';
import { getBookFilter, getVisibleBooks, booksActions } from 'src/core/books';
import Notification from '../../components/notification';
import BookList from '../../components/book-list';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconCreate from 'material-ui/svg-icons/content/add';
import BookForm from '../../components/book-form';

export class Books extends Component {
  static propTypes = {
    createBook: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired,
    dismissNotification: PropTypes.func.isRequired,
    filterBooks: PropTypes.func.isRequired,
    filterType: PropTypes.string.isRequired,
    loadBooks: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    notification: PropTypes.object.isRequired,
    books: PropTypes.instanceOf(List).isRequired,
    undeleteBook: PropTypes.func.isRequired,
    unloadBooks: PropTypes.func.isRequired,
    updateBook: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {open: false, logged: false, happySelected: false, loaded: false, pathname: '/my-books'};
  }

  componentWillMount() {
    if (this.props.location.pathname === '/my-books') {
      this.props.loadBooks('books');
    } else if (this.props.location.pathname === '/public-books') {
      this.props.loadBooks('public-books');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.props.unloadBooks();
      if (nextProps.location.pathname === '/my-books') {
        this.props.loadBooks('books');
      } else if (nextProps.location.pathname === '/public-books') {
        this.props.loadBooks('public-books');
      }
    }
  }

  componentWillUnmount() {
    this.props.unloadBooks();
  }



  renderAddBooks = () => {
    const style = {
      bottom: '25px',
      right: '25px',
      position: 'fixed'
    };
    return (
      <div>
      <FloatingActionButton
        style={style}
        onTouchTap={this.handleOpen}
        backgroundColor='#1D46DF'>
        <IconCreate/>
      </FloatingActionButton>
      <BookForm
        title="Add Book"
        open={this.state.open}
        ref="addBook"
        cancelAction={this.handleClose}
        submitAction={this.onSubmit}
      />
      </div>
    );
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  handleChange = (event, logged) => {
    this.setState({logged: logged});
  }

  onSubmit = () => {
    this.handleClose();
    this.props.createBook(this.refs.addBook.refs.toggle.state.isToggled, this.refs.addBook.refs.title.getValue(), this.refs.addBook.refs.author.getValue(), this.refs.addBook.refs.rating.props.value);
    this.refs.addBook.setState({rating: 0});
  }

  render() {
    return (
      <div>
      <BookList
        deleteBook={this.props.deleteBook}
        books={this.props.books}
        updateBook={this.props.updateBook}
        location={this.props.location.pathname}
      />
      <Notification
        action={this.props.undeleteBook}
        actionLabel={this.props.notification.actionLabel}
        dismiss={this.props.dismissNotification}
        display={this.props.notification.display}
        message={this.props.notification.message}
      />
      {this.props.location.pathname === '/my-books' ? this.renderAddBooks() : null}
      </div>
    );
  }
}


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = createSelector(
  getNotification,
  getBookFilter,
  getVisibleBooks,
  (notification, filterType, books) => ({
    notification,
    filterType,
    books
  })
);

const mapDispatchToProps = Object.assign(
  {},
  booksActions,
  notificationActions
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Books);
