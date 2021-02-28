import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const needsEmailVerification = authUser =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map(provider => provider.providerId)
    .includes('password');

const withEmailVerification = Component => {
  class WithEmailVerification extends React.Component {
    constructor(props) {
      super(props);

      this.state = { isSent: false };
    }

    onSendEmailVerification = () => {
      this.props.firebase
        .doSendEmailVerification()
        .then(() => this.setState({ isSent: true }));
    };

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            needsEmailVerification(authUser) ? (
              <div style={{paddingTop: '2rem', textAlign: 'center'}}>
                {this.state.isSent ? (
                  <Typography variant="p" color="inherit" style={{marginBottom: '1rem', display: 'block'}}>
                    E-Mail confirmation sent: Check your E-Mails (Spam
                    folder included) for a confirmation E-Mail.
                    Refresh this page once you confirmed your E-Mail.
                  </Typography>
                ) : (
                  <Typography variant="p" color="inherit" style={{marginBottom: '1rem', display: 'block'}}>
                    Verify your E-Mail: Check your E-Mails (Spam folder
                    included) for a confirmation E-Mail or send
                    another confirmation E-Mail.
                  </Typography>
                )}

                <Button
                  onClick={this.onSendEmailVerification}
                  disabled={this.state.isSent}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Send confirmation E-Mail
                </Button>
              </div>
            ) : (
              <Component {...this.props} />
            )
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return withFirebase(WithEmailVerification);
};

export default withEmailVerification;
