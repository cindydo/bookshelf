import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';

export default class muiAppBar extends Component {
  render() {
    const style = {
      background: '#1D46DF',
      position: 'fixed',
      textAlign: 'center'
    };
    return (
      <AppBar
          title={this.props.title}
          style={style}
          showMenuIconButton={this.props.showMenuIconButton}
          iconElementLeft={this.props.iconElementLeft}
          iconElementRight={this.props.iconElementRight}
          onLeftIconButtonTouchTap={this.props.onLeftIconButtonTouchTap}>
          {this.props.children}
      </AppBar>
    );
  }
}
