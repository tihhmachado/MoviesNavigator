import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Routes from '../../Routes';
import MenuTreeView from './TreeView';

export default function Page() {
  return (
    <Fragment>
      <Grid container>
        <Grid item xs={3}>
          <nav className="nav">
            <Grid container>
              <Grid item xs>
                <MenuTreeView />
              </Grid>
            </Grid>
          </nav>
        </Grid>
        <Grid item xs={9}>
          <div className="content">
            <Grid container>
              <Grid item xs>
                <Routes/>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  )
}