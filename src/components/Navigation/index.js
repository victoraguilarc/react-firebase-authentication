import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { AppBar, CssBaseline } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
    a: {
      textDecoration: 'none',
    }
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));


const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);


const NavigationAuth = ({ authUser }) => {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            vico:dev
          </Typography>
          <nav>
            <Link variant="button" color="textPrimary" to={ROUTES.LANDING}>
              <Button color="default">Landing</Button>
            </Link>
            <Link variant="button" color="textPrimary" to={ROUTES.HOME} className={classes.link}>
              <Button color="default">Home</Button>
            </Link>
            <Link variant="button" color="textPrimary" to={ROUTES.ACCOUNT} className={classes.link}>
              <Button color="default">Account</Button>
            </Link>
            {!!authUser.roles[ROLES.ADMIN] && (
              <Link variant="button" color="textPrimary" to={ROUTES.ADMIN} className={classes.link}>
                <Button color="default">Admin</Button>
              </Link>
            )}
          </nav>
          <SignOutButton />
        </Toolbar>
      </AppBar>
    </>
  );
}

const NavigationNonAuth = () => {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            vico:dev
          </Typography>
          <nav>
            <Link variant="button" color="textPrimary" to={ROUTES.LANDING} className={classes.link}>
              <Button color="default">Landing</Button>
            </Link>
            <Link variant="button" color="textPrimary" to={ROUTES.SIGN_IN}>
              <Button color="primary" variant="contained">Login</Button>
            </Link>
          </nav>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navigation;
