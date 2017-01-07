import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions } from 'src/core/auth';
import RaisedButton from 'material-ui/RaisedButton';


export function SignIn({signInWithGoogle}) {
  const style = {
    margin: 12
  };
  return (
    <div className="g-row sign-in">
      <div className="g-col" style={{textAlign: 'center'}}>
        <RaisedButton label="Sign in with Google" style={style} onTouchTap={signInWithGoogle} />
      </div>
    </div>
  );
}

SignIn.propTypes = {
  signInWithGithub: PropTypes.func.isRequired,
  signInWithGoogle: PropTypes.func.isRequired,
  signInWithTwitter: PropTypes.func.isRequired
};


//=====================================
//  CONNECT
//-------------------------------------

export default connect(null, authActions)(SignIn);
