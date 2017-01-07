import React from 'react';
import Snackbar from 'material-ui/Snackbar';

export default class muiSnackbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      autoHideDuration: 4000,
      open: false
    };
  }

  handleTouchTap = () => {
    this.setState({
      open: true
    });
  };

  handleChangeDuration = event => {
    const value = event.target.value;
    this.setState({
      autoHideDuration: value.length > 0 ? parseInt(value) : 0
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    return (
      <div>
        <Snackbar
          open={this.props.open}
          message={this.props.message}
          action="undo"
          autoHideDuration={this.state.autoHideDuration}
          onActionTouchTap={this.props.onActionTouchTap}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}
