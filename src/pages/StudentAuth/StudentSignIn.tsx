import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useMutation } from '@apollo/client';
import { Form as FormikForm, Formik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as Yup from 'yup';
import { InputAdornment, useMediaQuery } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as Styled from './styles';
import Error from '../../components/Errors';
import { LOGIN_MUTATION } from '../../graphql/mutations/login';
import { errorHandler, studentId } from '../../apollo/reactiveVariables';
import encrypt from '../../utils/encrypt';

const useStyles = makeStyles((theme)=>({
  root: {
    width: '348px',
    [theme.breakpoints.down('md')]:{
      width: '300px',
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    gridTemplateRows: '1fr',
    height: '100vh',
    placeItems: 'center',
    width: '100%',
    backgroundColor: '#F7F8FB',
    [theme.breakpoints.down('md')]:{
      gridTemplateColumns: '1fr',
      height: '100%',
    },
  },
  img: {
    width: '500px',
    height: 'auto',
    objectPosition: 'center',
    objectFit: 'cover',
  },
  leftPanelParent: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#CBA552',
  },
  heading: {
    textAlign: 'center',
    fontSize: '20px',
  },
  btmText: {
    fontSize: '12px',
    color: '#A4BDE7',
    textAlign: 'center',
    marginTop: '5px',
  },
}));

/*
* @fields
* userName registrationNumber password certification, currentYearOfStudy currentEnrolledSemester
* we also need to create a regex for the regnumber --> ICT-G-4-0726-18
* E B C H --> 0719509732
* */

/*
* we now know that dip programs are offered for a duration of 2 years or 6 academic semesters
* while certifcate is 3 academic semesters or 1 academic year
* * */

const SignUpSchema = Yup.object().shape({
  password: Yup.string().min(8).required('Password is required'),
  userName: Yup.string().required('Username is required'),
});

const LeftPanel = ():JSX.Element => {
  const classes = useStyles();
  return (
		<div className={classes.leftPanelParent}>
			<img className={classes.img} src="/leftSignInImages.png" alt="lecturer" />
		</div>
  );
};

const StudentSignIn = ()=> {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [show, setShow] = React.useState(false);
  const [SignInMutation, { loading }] = useMutation(LOGIN_MUTATION);
  const isMobileTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
		<div className={classes.grid}>
			{
				!isMobileTablet && <LeftPanel />
			}
			<Formik
				initialValues={{
				  userName:'',
				  password: '',
				}}

				onSubmit={async (values)=>{
				  // submit this form
				  try {
				    const response = await SignInMutation({
				      variables:{
				        userName: values.userName,
				        password: values.password,
				      },
				    });
				    if (response){
				      studentId(response?.data?.signIn?.id);
				      const dateSignedIn = new Date();
				      const expiryDate = dateSignedIn.setDate(dateSignedIn.getDate() + 1);
				      const sessionData = {
				      	exp:expiryDate,
				        xvsd: encrypt(response?.data?.signIn?.id),
				        role: encrypt(response?.data?.signIn?.role),
				        userName:encrypt(response?.data?.signIn?.userName),
				      };
				      // lets persist the user id to localstorage
				      // it helps us fetch data and validate that the user is still logged in
				      // we also need to set the expiration time
				      window.localStorage.setItem('dta', JSON.stringify(sessionData));
				      if (response?.data?.signIn?.role === 'student'){
				        history.push('/dashboard');
				      } else {
				        history.push('/admin-dashboard/file-info');
				      }
				    }
				  } catch (e) {
				    errorHandler({
				      open: true,
				      message: 'Could not upload your data',
				    });
				  }

				}}

				validationSchema={SignUpSchema}
			>
				{({ submitForm, handleChange, handleBlur, errors, values })=>(
					<FormikForm>
						<Typography className={classes.heading} variant="body1">Sign In to Fanaka</Typography>
						<Grid container justify="center" direction="column" alignItems="center">
							<div>
								<Styled.StyledFormControl error={Boolean(errors?.userName)}>
									<Styled.StyledTextField value={values.userName} autoComplete="off" style={{ marginTop: '39px' }} className={classes.root} onChange={handleChange} onBlur={handleBlur} name="userName" placeholder="Enter userName" type="text" variant="filled" />
								</Styled.StyledFormControl>
								<Error error={errors?.userName} />
							</div>
							<div>
								<Styled.StyledFormControl>
									<Styled.StyledTextField value={values.password} InputProps={{
									  endAdornment:
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={()=>setShow(!show)}
													onMouseDown={handleMouseDownPassword}
												>
													{show ? <VisibilityOffIcon /> : <VisibilityIcon />}
												</IconButton>
											</InputAdornment>,
									}} autoComplete="off" style={{ marginTop: '10px' }} className={classes.root} onChange={handleChange} onBlur={handleBlur} name="password" placeholder="Password" type={show ? 'text' : 'password'} variant="filled" />
								</Styled.StyledFormControl>
								<Error error={errors?.password} />
							</div>
							<div style={{ marginTop: '40px' }}>
                {
                  loading ? (
                    <CircularProgress />
                  ) : (
                    <Styled.StyledButton onClick={submitForm}>
                      Sign In
                    </Styled.StyledButton>
                  )
                }
							</div>
							<Typography className={classes.btmText} component="span" variant="body1">
								Dont have an account ? <Link style={{ fontSize: '12px', color: '#A4BDE7', textAlign: 'center' }} to="/fanaka/sign-up" >Sign up</Link>
							</Typography>
						</Grid>
					</FormikForm>
				)}
			</Formik>
		</div>
  );
};

export default StudentSignIn;
