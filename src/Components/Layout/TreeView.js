import React, { useState, useEffect, Fragment } from 'react';
import api from '../../Services/api';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import ListIcon from '@material-ui/icons/List';
import MovieIcon from '@material-ui/icons/Movie';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import './styles.css';

const useTreeItemStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.secondary,
    '&:focus > $content': {
      backgroundColor: `var('--tree-view-bg-color', ${theme.palette.grey[450]})`,
      color: '#E04130',
    },
    padding: theme.spacing(1),
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(1),
    borderBottomRightRadius: theme.spacing(1),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightBold,
    },
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    margin: theme.spacing(1, 0),
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
  },
}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color="inherit" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function MenuTreeView() {
  const classes = useStyles();
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const loadGenres = async () => {
      const response = await api.get('genres.json')
      setGenres(response.data);
    };
    loadGenres();
  }, []);

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}>
      {
        genres.map(item => {
          if (item.parentIndex === -1) {
            var itemIndex = item.index;
            return (
              <StyledTreeItem
                key={item.index}
                nodeId={String(item.index)}
                labelText={item.genre}
                labelIcon={ListIcon} >
                {genres.map(item => {
                  if (item.parentIndex === itemIndex) {
                    return (
                      <a href={"/titles/".concat(item.index)}
                        key={item.index}>
                        <StyledTreeItem
                          nodeId={String(item.index)}
                          labelText={item.genre}
                          labelIcon={MovieIcon} />
                      </a>
                    )
                  } else {
                    return <Fragment key={item.index} />
                  }
                })}
              </StyledTreeItem>
            )
          } else {
            return <Fragment key={item.index} />
          }
        })
      }
    </TreeView>
  );
}
