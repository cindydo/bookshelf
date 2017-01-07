import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class muiButton extends Component {
  render() {
    const style = {
      margin: 12
    };
    return (
      <RaisedButton label={this.props.label} style={style} onTouchTap={this.props.onTouchTap} />
    );
  }
}
