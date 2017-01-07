import React, { Component, PropTypes } from 'react';
import Snackbar from 'material-ui/Snackbar';

export default class Notification extends Component {
  static propTypes = {
    action: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.props.dimiss();
  }

  render() {
    return (
      <Snackbar
          open={this.props.display}
          message={this.props.message}
          action="Undo"
          autoHideDuration={7000}
          onActionTouchTap={this.props.action}
        />
    );
  }
}
