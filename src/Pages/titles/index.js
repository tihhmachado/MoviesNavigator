import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from 'react-router-dom';
import api from '../../Services/api';
import './styles.css'
import { Grid, Grow, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    height: 180
  },
  paper: {
    margin: theme.spacing(1)
  },
}));

export default function Titles() {
  const [titles, setTitles] = useState([]);
  const classes = useStyles();
  let { id } = useParams();

  useEffect(() => {
    const loadTitles = async () => {
      const response = await api.get('titles.json')
      setTitles(response.data);
    };
    loadTitles();
  }, []);

  return (
    <Fragment>
      <div className="titles_list">
        {titles.map(item => {
          if (item.genreIndex === parseInt(id)) {
            return (
              <Grow in={true} key={item.index}>
                <Paper elevation={2} className={classes.paper}>
                  <article key={item.index}>
                    <Grid container>
                      <Grid item xs={11}>
                        <strong>
                          {item.title}
                        </strong>
                      </Grid>
                      <Grid item xs={1}>
                        <strong className="year">
                          {item.year}
                        </strong>
                      </Grid>
                    </Grid>
                    <p>{item.plot}</p>
                  </article>
                </Paper>
              </Grow>
            )
          } else {
            return null;
          }
        })}
      </div>
    </Fragment>
  )
}