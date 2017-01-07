import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import MuiDialog from '../common/muiDialog';
import MuiToggle from '../common/muiToggle';
import MuiButton from '../common/muiButton';
import ReactStars from 'react-stars';

export default class BookForm extends Component {
  constructor(props) {
    super(props);
    let rating = 0;
    if (this.props.action === 'edit') {
      rating = this.props.book.rating;
    }
    this.state = {rating: rating};
  }

  ratingChanged = newRating => {
    this.setState({rating: newRating});
  }

  render() {
    const styles = {
      errorStyle: {
        color: '#1D46DF'
      },
      underlineStyle: {
        borderColor: '#1D46DF'
      },
      floatingLabelStyle: {
        color: '#1D46DF'
      },
      floatingLabelFocusStyle: {
        color: '#1D46DF'
      }
    };

    const actions = [
      <MuiButton
        label='Cancel'
        onTouchTap={this.props.cancelAction}
      />,
      <MuiButton
        label='Submit'
        onTouchTap={this.props.submitAction}
      />
    ];
    return (
      <MuiDialog title={this.props.title} actions={actions} open={this.props.open}>
        <br/>
        <MuiToggle
          ref='toggle'
          defaultToggled={this.props.action === 'edit' ? this.props.book.isPublic : false}
        />
        <TextField
          defaultValue={this.props.action === 'edit' ? this.props.book.title : ''}
          floatingLabelText='Book Title'
          ref='title'
          underlineFocusStyle={styles.underlineStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
        />
        <br/>
        <TextField
          defaultValue={this.props.action === 'edit' ? this.props.book.author : ''}
          floatingLabelText='Author'
          ref='author'
          underlineFocusStyle={styles.underlineStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
        />
        <br/>
        <br/>
        <b>Rate It:</b>
        <br/>
        <ReactStars
          count={5}
          size={24}
          value={this.state.rating}
          onChange={this.ratingChanged}
          color2={'#ffd700'}
          ref="rating"
        />
      </MuiDialog>
    );
  }
}
