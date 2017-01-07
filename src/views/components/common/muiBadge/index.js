import React, {Component} from 'react';
import Badge from 'material-ui/Badge';

export default class muiBadge extends Component {
  render() {
    return (
        <Badge
          badgeContent={4}
          primary={true}
        />
    );
  }
}
