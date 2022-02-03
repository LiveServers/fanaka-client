import React from 'react';
import { useReactiveVar } from '@apollo/client';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
import { nanoid } from 'nanoid';
import Grid from '@material-ui/core/Grid';
import { useMediaQuery } from '@material-ui/core';
import { saveAs } from 'file-saver';
import { setFile, studentFileData } from '../../apollo/reactiveVariables';
import * as Styled from './styles';
import decrypt from '../../utils/decrypt';
import FileReader from '../FileReader/FileReader';
import Chat from '../Rooms/Chat';
import JoinRoom from '../Rooms/JoinRoom';

const useStyles = makeStyles((theme)=>({
  root: {
    backgroundColor: '#F7F8FB',
    display: 'flex',
    flexDirection:'column',
	  alignItems: 'center',
	  justifyContent: 'flex-start',
    overflowX: 'visible',
  },
  chatRoot: {
    backgroundColor: '#F7F8FB',
    overflowX: 'visible',
  },
  btn: {
    backgroundColor: '#CBA552',
    width: 60,
    height: 30,
    color: '#fff',
    border: 0,
  },
  txt: {
    fontSize: '16px',
    width: '100%',
  },
  noFileTopTxt: {
    marginTop: theme.spacing(3),
  },
  noFileImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
  },
  paper: {
    margin: theme.spacing(2),
    width: '90%',
    [theme.breakpoints.down('md')]: {
      width: '300px',
    },
  },
  icon: {
    color: '#CBA552',
    marginRight: theme.spacing(2),
  },
  filereaderRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  backButton: {
    color: '#CBA552',
  },
}));

const RightWrapper = ({ active, setActive }:any) => {
  const theme = useTheme();
  const [fileName, setFileName] = React.useState('');
  const isMobileTablet = useMediaQuery(theme.breakpoints.down('md'));
  const { root, txt, btn, noFileImage, noFileTopTxt, paper, icon, chatRoot } = useStyles();
  const classes = useStyles();
  const files = useReactiveVar(studentFileData);
  const sliceLongFileNames = (name:string) => {
    const lengthToFilter = isMobileTablet ? 10 : 30;
    name = name.slice(0, lengthToFilter);
    return `${name}...`;
  };
  const saveFileToLocal = (pos:number, file:string) => {
    const filteredFile = Array.isArray(files.files) && files.files.length > 0 && files.files ? files.files.filter((item:string, index:number)=>index === pos) : [];
    const decryptedFile = decrypt(filteredFile[0]);
    saveAs(decryptedFile, `${file}`);
  };
  const handleViewPdf = (pos:number, item:string) => {
    const filteredFile = Array.isArray(files.files) && files.files.length > 0 && files.files ? files.files.filter((_:string, index:number)=>index === pos) : [];
    const decryptedFile = decrypt(filteredFile[0]);
    setFile(decryptedFile);
    setActive('read-file');
    setFileName(item);
  };
  return (
		<div className={active === 'chat' ? chatRoot : root}>
      {
        active === 'chat' ? (
          <Chat />
        ) : (
          <>
            {
              active === 'join-room' ? (
                <JoinRoom setActive={setActive} />
              ) : (
                <>
                  {
                    active === 'read-file' ? (
                      <FileReader setActive={setActive} classes={classes} fileName={fileName} isMobileTablet={isMobileTablet} />
                    ) : (
                      <>
                        {
                          files.courseCode !== '' ? (
                            <>
                              <Typography className={noFileTopTxt} variant="body1">{files.courseCode}</Typography>
                              {
                                Array.isArray(files.fileNames) && files.fileNames.length > 0 && files.fileNames.map((item, index)=>(
                                  <React.Fragment key={nanoid()}>
                                    <Styled.StyledPaper className={paper} elevation={3}>
                                      <Typography className={txt} variant='body1'>
                                        {sliceLongFileNames(item)}
                                      </Typography>
                                      <Grid container direction="row" alignItems="center" justify="flex-end" wrap="nowrap">
                                        <IconButton className={icon} onClick={()=>saveFileToLocal(index, item)}>
                                          <GetAppIcon />
                                        </IconButton>
                                        <button type="button" className={btn} onClick={()=>handleViewPdf(index, item)}>READ</button>
                                      </Grid>
                                    </Styled.StyledPaper>
                                  </React.Fragment>
                                ))
                              }
                            </>
                          ) : (
                            <>
                              <Typography className={noFileTopTxt} variant="body1">Select Unit To View Available Notes</Typography>
                              <div className={noFileImage}>
                                <img src="/empty.jpg" alt="empty state" />
                              </div>
                            </>
                          )
                        }
                      </>
                    )
                  }
                </>
              )
            }
          </>
        )
      }
		</div>
  );
};

export default RightWrapper;
