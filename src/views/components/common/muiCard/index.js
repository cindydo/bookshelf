import React, {Component} from 'react';
import {Card, CardHeader} from 'material-ui/Card';

export default class muiCard extends Component {
  render() {
    const style = {
      boxShadow: 'none'
    };
    return (
      <Card style={style}>
        <CardHeader
          title={this.props.title}
          subtitle={this.props.subtitle}
          avatar={this.props.avatar}
        />
      </Card>
    );
  }
}
