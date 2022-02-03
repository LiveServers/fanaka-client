import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Form as FormikForm, Formik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { nanoid } from 'nanoid';
import Typography from '@material-ui/core/Typography';
// import * as Yup from 'yup';
import { InputAdornment, useMediaQuery } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useMutation } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as Styled from './styles';
import * as Constants from '../../constants/constants';
import * as programmes from './programmes';
import Error from '../../components/Errors';
import { SIGN_UP } from '../../graphql/mutations/login';
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
    backgroundColor: '#F7F8FB',
    height: '100vh',
    placeItems: 'center',
    width: '100%',
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

// const SignUpSchema = Yup.object().shape({
//   password: Yup.string().min(8).required('Password is required'),
//   confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords should match').required('Confirm password is required'),
//   userName: Yup.string().required('Username is required'),
//   regNo: Yup.string().required('Registration no is required'),
//   school: Yup.string().required('Field required'),
//   certification: Yup.string().required('Field required'),
//   currentYearOfStudy: Yup.string().required('Field is required'),
//   currentEnrolledSemester: Yup.string().required('Field is required'),
//   currentEnrolledProgramme: Yup.string().required('Field required'),
//   year: Yup.string().required('Field required'),
//   semester: Yup.string().required('Field required'),
// });

const LeftPanel = ():JSX.Element => {
  const classes = useStyles();
  return (
		<div className={classes.leftPanelParent}>
			<img className={classes.img} src="/leftImage.png" alt="lecturer" />
		</div>
  );
};

const StudentSignUp = ()=> {
  const [SignUpMutation, { loading }] = useMutation(SIGN_UP);
  const classes = useStyles();
  const [show, setShow] = React.useState(false);
  const theme = useTheme();
  const history = useHistory();
  const isMobileTablet = useMediaQuery(theme.breakpoints.down('md'));

  const selectSemesterDependingOnYear = (year:string) => ({
    'First Year':[Constants.SEMESTER_ONE_POINT_ONE, Constants.SEMESTER_ONE_POINT_TWO],
    'Second Year':[Constants.SEMESTER_TWO_POINT_ONE, Constants.SEMESTER_TWO_POINT_TWO],
    'Third Year':[Constants.SEMESTER_THREE_POINT_ONE, Constants.SEMESTER_THREE_POINT_TWO],
    'Fourth Year':[Constants.SEMESTER_FOUR_POINT_ONE, Constants.SEMESTER_FOUR_POINT_TWO],
  }[year]);

  const selectYearFromUploadedCertificate = (certificate:string) => ({
    'Degree':[Constants.YEAR_ONE, Constants.YEAR_TWO, Constants.YEAR_THREE, Constants.YEAR_FOUR],
    'Diploma':[Constants.YEAR_ONE, Constants.YEAR_TWO, Constants.YEAR_THREE],
    'Certificate':[Constants.YEAR_ONE],
  }[certificate]);

  const selectCurrentEnrolledProgramme = (school:string, certificate:string) =>({
    'Computing And Informatics Degree': programmes.csDegreeProgrammes,
    'Computing And Informatics Diploma': programmes.csDiplomaProgrammes,
    'Computing And Informatics Certificate': programmes.csCertificateProgrammes,
    'Business Degree': programmes.bsDegreeProgrammes,
    'Business Diploma': programmes.bsDiplomaProgrammes,
    'Business Certificate': programmes.bsCertificateProgrammes,
    'Education Degree': programmes.edDegreeProgrammes,
    'Education Diploma': programmes.edDiplomaProgrammes,
    'Education Certificate': programmes.edCertificateProgrammes,
    'Health Sciences Degree': programmes.hsDegreeProgrammes,
    'Health Sciences Diploma': programmes.hsDiplomaProgrammes,
    'Health Sciences Certificate': programmes.hsCertificateProgrammes,
    'Hospitality And Tourism Degree': programmes.htDegreeProgrammes,
    'Hospitality And Tourism Diploma': programmes.htDiplomaProgrammes,
    'Hospitality And Tourism Certificate': programmes.htCertificateProgrammes,
    'Humanities And Social Sciences Degree': programmes.ssDegreeProgrammes,
    'Humanities And Social Sciences Diploma': programmes.ssDiplomaProgrammes,
    'Humanities And Social Sciences Certificate': programmes.ssCertificateProgrammes,
  }[`${school} ${certificate}`]);

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
			  regNo:'',
			  password: '',
			  confirmPassword: '',
			  school: '',
			  certification: '',
			  currentEnrolledProgramme: '',
			  year: '',
			  semester: '',
			}}

			onSubmit={async (values)=>{
			  // submit this form
			  console.log('Reaches here');
			  try {
			    const response = await SignUpMutation({
			      variables: {
			        input: {
			          userName: values.userName,
			          regNo: values.regNo,
			          password: values.password,
			          school: values.school,
			          certification: values.certification,
			          currentEnrolledProgramme: values.currentEnrolledProgramme,
			          year: values.year,
			          semester: values.semester,
			        },
			      },
			    });
			    if (response){
			      studentId(response?.data?.studentSignUp?.id);
			      const dateSignedIn = new Date();
			      const expiryDate = dateSignedIn.setDate(dateSignedIn.getDate() + 1);
			      const sessionData = {
			        exp:expiryDate,
			        xvsd: encrypt(response?.data?.studentSignUp?.id),
			        role: encrypt(response?.data?.studentSignUp?.role),
			        userName:encrypt(response?.data?.studentSignUp?.userName),
			      };
			      // lets persist the user id to localstorage
			      // it helps us fetch data and validate that the user is still logged in
			      // we also need to set the expiration time
			      window.localStorage.setItem('dta', JSON.stringify(sessionData));
			      if (response?.data?.studentSignUp?.role === 'student'){
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

			// validationSchema={SignUpSchema}
		>
			{({ submitForm, handleChange, handleBlur, values, setFieldValue, errors })=>(
				<FormikForm>
					<Typography className={classes.heading} variant="body1">Sign Up to Fanaka</Typography>
					<Grid container justify="center" direction="column" alignItems="center">
						<div>
						<Styled.StyledFormControl error={Boolean(errors?.userName)}>
							<Styled.StyledTextField autoComplete="off" style={{ marginTop: '39px' }} className={classes.root} onChange={handleChange} onBlur={handleBlur} name="userName" placeholder="Enter userName" type="text" variant="filled" />
						</Styled.StyledFormControl>
							<Error error={errors?.userName} />
							</div>
						<div>
						<Styled.StyledFormControl>
							<Styled.StyledTextField autoComplete="off" style={{ marginTop: '10px' }} className={classes.root} onChange={handleChange} onBlur={handleBlur} name="regNo" placeholder="Enter Registration Number" type="text" variant="filled" />
						</Styled.StyledFormControl>
							<Error error={errors?.regNo} />
							</div>
						<div>
						<Styled.StyledFormControl>
							<Styled.StyledTextField InputProps={{
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
						<div>
						<Styled.StyledFormControl>
							<Styled.StyledTextField InputProps={{
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
							}} autoComplete="off" style={{ marginTop: '10px' }} className={classes.root} onChange={handleChange} onBlur={handleBlur} name="confirmPassword" placeholder="Confirm Password" type={show ? 'text' : 'password'} variant="filled" />
						</Styled.StyledFormControl>
						<Error error={errors?.confirmPassword} />
					</div>
						<div style={{ marginTop: '10px' }}>
							<Styled.StyledFormControl>
								<Styled.StyledSelect className={classes.root} name="school" onBlur={handleBlur} value={values.school} onChange={(e)=>{
								  handleChange(e);
								  setFieldValue('certification', '');
								}}>
									<option value="" disabled>
										Select school enrolled
									</option>
									<option value={Constants.SCHOOL_ONE}>{Constants.SCHOOL_ONE}</option>
									<option value={Constants.SCHOOL_TWO}>{Constants.SCHOOL_TWO}</option>
									<option value={Constants.SCHOOL_THREE}>{Constants.SCHOOL_THREE}</option>
									<option value={Constants.SCHOOL_FOUR}>{Constants.SCHOOL_FOUR}</option>
									<option value={Constants.SCHOOL_FIVE}>{Constants.SCHOOL_FIVE}</option>
									<option value={Constants.SCHOOL_SIX}>{Constants.SCHOOL_SIX}</option>
								</Styled.StyledSelect>
							</Styled.StyledFormControl>
							<Error error={errors?.school} />
						</div>
						<div style={{ marginTop: '10px' }}>
							<Styled.StyledFormControl disabled={!values.school}>
								<Styled.StyledSelect className={classes.root} name="certification" onBlur={handleBlur} value={values.certification} onChange={(e)=>{
								  handleChange(e);
								  setFieldValue('currentEnrolledProgramme', '');
								}}>
									<option value="" disabled>
										Select certificate enrolled in
									</option>
									<option value={Constants.CERT_ONE}>{Constants.CERT_ONE}</option>
									<option value={Constants.CERT_TWO}>{Constants.CERT_TWO}</option>
									<option value={Constants.CERT_THREE}>{Constants.CERT_THREE}</option>
								</Styled.StyledSelect>
							</Styled.StyledFormControl>
							<Error error={errors?.certification} />
						</div>
						<div style={{ marginTop: '10px' }}>
							<Styled.StyledFormControl disabled={!values.certification}>
								<Styled.StyledSelect className={classes.root} name="currentEnrolledProgramme" onBlur={handleBlur} value={values.currentEnrolledProgramme} onChange={(e)=>{
								  handleChange(e);
								  setFieldValue('year', '');
								}}>
									<option value="" disabled>
										Select current enrolled programme
									</option>
									{
										/* @ts-ignore */
										values.school && values.certification && selectCurrentEnrolledProgramme(values?.school, values?.certification).map((item:string)=>(
											<option key={nanoid()} value={item}>{item}</option>
										))
									}
								</Styled.StyledSelect>
							</Styled.StyledFormControl>
							<Error error={errors?.currentEnrolledProgramme} />
						</div>
						<div style={{ marginTop: '10px' }}>
							<Styled.StyledFormControl disabled={!values.currentEnrolledProgramme}>
								<Styled.StyledSelect className={classes.root} name="year" onBlur={handleBlur} value={values.year} onChange={(e)=>{
								  handleChange(e);
								  setFieldValue('semester', '');
								}}>
									<option value="" disabled>
										Select year of study
									</option>
									{
										<>
											{
												/* @ts-ignore */
												values.certification !== '' && selectYearFromUploadedCertificate(values?.certification).map((item:string)=>(
													<option key={nanoid()} value={item}>{item}</option>
												))
											}
										</>
									}
								</Styled.StyledSelect>
							</Styled.StyledFormControl>
							<Error error={errors?.year} />
						</div>
						<div style={{ marginTop: '10px' }} >
							<Styled.StyledFormControl disabled={!values.year}>
								<Styled.StyledSelect className={classes.root} name="semester" onBlur={handleBlur} value={values.semester} onChange={handleChange}>
									<option value="" disabled>
										Select semester
									</option>
									{
										values.year && (
											<>
												{/* @ts-ignore */}
												<option value={selectSemesterDependingOnYear(values?.year)[0]}>{selectSemesterDependingOnYear(values?.year)[0]}</option>
												{/* @ts-ignore */}
												<option value={selectSemesterDependingOnYear(values?.year)[1]}>{selectSemesterDependingOnYear(values?.year)[1]}</option>
											</>
										)
									}
								</Styled.StyledSelect>
							</Styled.StyledFormControl>
							<Error error={errors?.semester} />
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
							Already have an account ? <Link style={{ fontSize: '12px', color: '#A4BDE7', textAlign: 'center' }} to="/fanaka/sign-in" >Sign in</Link>
						</Typography>
					</Grid>
				</FormikForm>
			)}
		</Formik>
		</div>
  );
};

export default StudentSignUp;
