import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import * as Interfaces from '../../InterfacesEnumsTypes/Interfaces/Interfaces';

const useStyles = makeStyles(()=>({
  bottomNav:{
    margin:'0',
    position:'fixed',
    bottom:'0',
    width: '100%',
    background: '#CBA552',
    padding: '1rem',
  },
}));

const Footer = ({ footerMessage }:Interfaces.FooterProps) => {
  const classes = useStyles();
  return (
        <Grid className={classes.bottomNav} container alignItems="center" justify="center">
            <Typography variant="subtitle1">{footerMessage}</Typography>
        </Grid>
  );
};

export default Footer;
