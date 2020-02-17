import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: '#E04130',
  },

  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  toolbar: {

  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <header >
      <AppBar position="static" className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.title} variant="h5" noWrap>
            Movies navigator
          </Typography>
        </Toolbar>
      </AppBar>
    </header>
  );
}
