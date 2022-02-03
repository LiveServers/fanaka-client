import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { nanoid } from 'nanoid';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import * as Styled from './styles';
import { errorHandler, studentFileData } from '../../apollo/reactiveVariables';
import { LOG_OUT } from '../../graphql/mutations/login';

const useStyles = makeStyles((theme)=>({
  root: {
    backgroundColor: '#fff',
  },
  topComponent: {
    marginTop: theme.spacing(4),
  },
  avatar: {
    borderRadius: '100%',
    width: 30,
    height: 30,
    background: '#CBA552',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  units: {
  	paddingLeft: '12px',
  },
  studentTxt: {
    paddingLeft: '12px',
  },
  studInfo: {
  	marginTop: theme.spacing(4),
  },
  logOut: {
  	marginRight: theme.spacing(2),
    cursor: 'pointer',
  },
  btn: {
    color: '#CBA552',
  },
}));

const LeftWrapper = ({ data, setActive }:any) => {
  const classes = useStyles();
  const [LogOut] = useMutation(LOG_OUT);
  const router = useHistory();
  const [checked, setChecked] = React.useState(new Array(data.fetchStudentDetailsAndFilesForRegisteredSemester.result.length).fill(false));
  const { fetchStudentDetailsAndFilesForRegisteredSemester: { result, studentDetails } } = data;
  const handleChange = (index:number, files:any) => {
  	/*
  	* we check if there is any active checkbox, remove it and update with
  	* the new checkbox
  	* */
    // eslint-disable-next-line array-callback-return
    const newCheck = checked.map((item, pos)=>{
    	if (item === true && pos === index){
        studentFileData({
          courseCode: '',
          fileNames: '',
          files: '',
        });
        return false;
      } if (pos === index){
        studentFileData({
          courseCode: files.courseCode,
          fileNames: files.fileNames,
          files: files.files,
        });
        return true;
      }
    });
    setChecked(newCheck);
    setActive('');
  };
  const handleLogout = async () => {
    try {
      const response = await LogOut();
      if (response){
        window.localStorage.clear();
        router.push('/fanaka/sign-in');
      }
    } catch (e) {
      errorHandler({
        open: true,
        message: 'Could not log you out',
      });
    }
  };
  return (
		<Grid className={classes.root} container direction="column" justify="flex-start" alignItems="flex-start" wrap="nowrap">
			<Grid className={classes.topComponent} container direction="row" justify="space-between" alignItems="flex-start" wrap="nowrap">
				<Typography className={classes.studentTxt} variant="body1">
					Student View
				</Typography>
				<Typography onClick={handleLogout} className={classes.logOut} variant="body1">
					Log out
				</Typography>
			</Grid>
			<Grid className={classes.studInfo} container direction="column" justify="center" alignItems="center">
				<div className={classes.avatar}>KK</div>
				<Typography variant="body1">
					{studentDetails.currentEnrolledProgramme}
				</Typography>
				<Typography variant="body1">
					{studentDetails.certification}
				</Typography>
				<Typography variant="body1">
					{studentDetails.semester}
				</Typography>
			</Grid>
			<Grid container direction="column" justify="center" alignItems="flex-start">
				<Typography className={classes.units} variant="body1">
					Units
				</Typography>
					{
						Array.isArray(result) && result.length > 0 && result.map((item, index)=>(
							<Grid key={nanoid()} container direction="row" justify="flex-start" alignItems="center">
								<Styled.StyledCheckbox name="check"  checked={checked[index]} onChange={() => handleChange(index, item)} inputProps={{ 'aria-label': 'primary checkbox' }} size="small" />
								<Typography variant="body1">
									{item.unitName}
								</Typography>
							</Grid>
						))
					}
			</Grid>
      <Grid container direction="column" alignItems="flex-start" justify="flex-start" wrap="nowrap">
      <Grid style={{ marginLeft:'12px', cursor: 'pointer' }} onClick={()=>setActive('join-room')} container direction="row" alignItems="center" justify="flex-start" wrap="nowrap">
        <Typography style={{ fontWeight: 'bolder' }} variant="body1">Join Room</Typography>
        <IconButton className={classes.btn}>
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Grid>
      </Grid>
		</Grid>
  );
};

export default LeftWrapper;
