import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { authActions, getAuth } from 'src/core/auth';
import { paths } from '../routes';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MuiAppBar from '../components/common/muiAppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import MuiCard from '../components/common/muiCard';

export class App extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {open: false};
  }

  componentWillReceiveProps(nextProps) {
    const { router } = this.context;
    const { auth } = this.props;

    if (auth.authenticated && !nextProps.auth.authenticated) {
      router.replace(paths.SIGN_IN);
    }
    else if (!auth.authenticated && nextProps.auth.authenticated) {
      router.replace(paths.BOOKS);
    }
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }


  handleSignout = () => {
    this.props.signOut();
    this.handleClose();
  }

  render() {
    const maxHeight={
      height: '100%'
    };

    return (
      <MuiThemeProvider>
      <div style={maxHeight}>
        <MuiAppBar title="Bookshelf" onLeftIconButtonTouchTap={this.handleOpen} showMenuIconButton={this.props.auth.authenticated}/>
        <Drawer open={this.state.open} docked={false} onRequestChange={open => this.setState({open})}>
          <MuiCard title={this.props.auth.displayName} subtitle={this.props.auth.email} avatar="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"/>
          <Subheader>Books</Subheader>
          <Link to="/my-books"><MenuItem onTouchTap={this.handleClose}>My Books</MenuItem></Link>
          <Link to="/public-books"><MenuItem onTouchTap={this.handleClose}>Public Books</MenuItem></Link>
          <Divider />
          <Link to="/sign-out"><MenuItem onTouchTap={this.handleSignout}>Log out</MenuItem></Link>
        </Drawer>
        <div style={{paddingTop: '64px'}}>
        {this.props.children}
        </div>
        </div>
      </MuiThemeProvider>
    );
  }
}


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = createSelector(
  getAuth,
  auth => ({auth})
);

export default connect(
  mapStateToProps,
  authActions
)(App);
