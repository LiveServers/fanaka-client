import React from  "react";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from "@material-ui/core/Grid";

const ListView = () :JSX.Element=>{
    return (
        <Grid container direction="column" alignItems="flex-start" spacing={2}>
            <List component="nav" aria-label="semester units">
                <ListItem button>
                    <ListItemText primary="Some Text" />
                </ListItem>
            </List>
        </Grid>
    )
}

export default React.memo(ListView);