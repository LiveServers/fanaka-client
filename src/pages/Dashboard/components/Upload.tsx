import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FilesDropZone from './FilesDropZone';

const useStyles = makeStyles((theme)=>({
  uploadGrid: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  dropText:{
    color: '#c8c2bc',
    cursor:'pointer',
  },
  dropZone:{
    border: '1px #281987 dashed',
    backgroundColor:'#fff',
    height:'60vh',
    width:'660px',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    [theme.breakpoints.down('md')]:{
      width: '300px',
    },
  },
  textFileName:{
    marginTop:theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      color: '#000',
    },
  },
}));

const Upload = ()=>{
  const classes = useStyles();
  return (
		<div className={classes.uploadGrid}>
			<FilesDropZone classes={classes} />
		</div>
  );
};

export default Upload;
