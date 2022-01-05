import React from  'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import { ListItemSecondaryAction } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(()=>({
  listItem:{
    padding:'16px 0px',
    background:'red !important',
  },
}));
// @ts-ignore
const ListView = ({ unitName }:any):JSX.Element => {
  const classes = useStyles();
  return (
        <Grid style={{ width:'100%' }} container direction="column" alignItems="flex-start" spacing={2}>
            <Grid style={{ width:'100%' }} item xs={12} lg={6} sm={12} xl={6}>
            <List component="nav" aria-label="semester units">
                <ListItem className={classes.listItem} button>
                    <ListItemText primary={unitName} />
                </ListItem>
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="next">
                        <NavigateNextIcon fontSize="large" />
                    </IconButton>
                </ListItemSecondaryAction>
            </List>
            </Grid>
        </Grid>
  );
};

export default React.memo(ListView);
