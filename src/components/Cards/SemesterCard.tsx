import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

const useStyles = makeStyles(theme=>({
  box:{
    border:'1px solid #EDE7E7',
    borderRadius:'10px',
    background:'#CBA552',
    backdropFilter:'blur(4px)',
    display:'flex',
    alignItems:'center',
    flexDirection:'column',
    justifyContent:'space-evenly',
    width:'200px',
    height:'200px',
    gap:'2%',
    [theme.breakpoints.down('sm')]:{
      width:'110px',
      height:'110px',
      padding:'1rem',
    },
  },
}));

const SemesterCard = ({ _id, year, semester, path, handlePassSemesterProps }:any):JSX.Element => {
  const classes = useStyles();

  return (
        <div onClick={()=>handlePassSemesterProps(year, semester, path, _id)} className={classes.box}>
            <IconButton size="small">
                <LibraryBooksIcon />
            </IconButton>
            <Typography variant="subtitle2">
                {semester}
            </Typography>
        </div>
  );
};

export default React.memo(SemesterCard);
