import React from 'react';

import { withFirebase } from '../Firebase';
import Button from '@material-ui/core/Button';

const SignOutButton = ({ firebase }) => (
  <Button color="primary" variant="contained" onClick={firebase.doSignOut}>
    Logout
  </Button>
);

export default withFirebase(SignOutButton);
