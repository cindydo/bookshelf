import React, {Component} from 'react';
import Toggle from 'material-ui/Toggle';

const styles = {
  block: {
    maxWidth: 250
  },
  toggle: {
    marginBottom: 16
  },
  thumbOff: {
    backgroundColor: '#1D46DF'
  },
  trackOff: {
    backgroundColor: '#1D46DF'
  },
  thumbSwitched: {
    backgroundColor: '#1D46DF'
  },
  trackSwitched: {
    backgroundColor: '#1D46DF'
  },
  labelStyle: {
    color: '#1D46DF'
  }
};

export default class muiToggle extends Component {
  constructor(props) {
    super(props);

    let label = '';
    let isToggled = false;
    if (this.props.defaultToggled) {
      label = 'Public';
      isToggled = true;
    } else if (!this.props.defaultToggled) {
      label = 'Private';
      isToggled = false;
    }

    this.state = {isToggled: isToggled, label: label};
  }

  onToggle = (event, logged) => {
    this.setState({isToggled: logged});
    if (logged) {
      this.setState({label: 'Public'});
    } else if (!logged) {
      this.setState({label: 'Private'});
    }
  }

  render() {
    return (
      <div style={styles.block}>
        <Toggle
          defaultToggled={this.props.defaultToggled}
          label={this.state.label}
          style={styles.toggle}
          onToggle={this.onToggle}
          thumbSwitchedStyle={styles.thumbSwitched}
          trackSwitchedStyle={styles.trackSwitched}
        />
      </div>
    );
  }
}
