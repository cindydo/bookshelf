import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';

export default class muiDialog extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Dialog
        title={this.props.title}
        actions={this.props.actions}
        modal={true}
        open={this.props.open}
      >
      {this.props.children}
      </Dialog>
    );
  }
}
