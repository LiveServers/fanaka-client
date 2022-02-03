import React from 'react';
import { Formik, Form as FormikForm } from 'formik';
import Grid from '@material-ui/core/Grid';
import { nanoid } from 'nanoid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/client';
import * as Constants from '../../constants/constants';
import Error from '../../components/Errors';
import * as Styled from '../StudentAuth/styles';
import { errorHandler, setRoomId } from '../../apollo/reactiveVariables';
import * as programmes from '../StudentAuth/programmes';
import CREATE_ROOM from '../../graphql/mutations/createRoom';

const useStyles = makeStyles((theme)=>({
  root: {
    width: '348px',
    [theme.breakpoints.down('md')]:{
      width: '300px',
    },
  },
}));

const CreateRoom = () => {
  const classes = useStyles();
  const history = useHistory();
  const [CreateRoomMutation, { loading }] = useMutation(CREATE_ROOM);
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

  // const dis = (values:FormikValues) => {
  //   console.log(values);
  //   if (!values.roomName || !values.school || !values.certificate || !values.programme || !values.year || !values.semester){
  //     return true;
  //   }
  //   return false;
  // };
  return (
    <Formik
      initialValues={{
        roomName: '',
        school: '',
        certificate: '',
        programme: '',
        year: '',
        semester: '',
      }}

      onSubmit={async (values)=>{
        try {
          const response = await CreateRoomMutation({
            variables: {
              input: {
                roomName: values.roomName,
                school: values.school,
                certificate: values.certificate,
                programme: values.programme,
                year: values.year,
                semester: values.semester,
              },
            },
          });
          if (response && response?.data?.createRoom?.status){
            setRoomId(response?.data?.createRoom?.id);
            history.push('/admin-dashboard/join-room');
          }
        } catch (e) {
          errorHandler({
            open: true,
            message: 'Could not upload your data',
          });
        }
      }}
    >
      {({ submitForm, handleChange, handleBlur, values, setFieldValue, errors })=>(
        <FormikForm>
          <Grid container justify="center" direction="column" alignItems="center">
            <div>
              <Styled.StyledFormControl error={Boolean(errors?.roomName)}>
                <Styled.StyledTextField autoComplete="off" style={{ marginTop: '39px' }} className={classes.root} onChange={handleChange} onBlur={handleBlur} name="roomName" placeholder="Enter Room Name" type="text" variant="filled" />
              </Styled.StyledFormControl>
              <Error error={errors?.roomName} />
            </div>
            <div style={{ marginTop: '10px' }}>
              <Styled.StyledFormControl>
                <Styled.StyledSelect className={classes.root} name="school" onBlur={handleBlur} value={values.school} onChange={(e)=>{
                  handleChange(e);
                  setFieldValue('certification', '');
                }}>
                  <option value="" disabled>
                    Select school
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
                <Styled.StyledSelect className={classes.root} name="certificate" onBlur={handleBlur} value={values.certificate} onChange={(e)=>{
                  handleChange(e);
                  setFieldValue('programme', '');
                }}>
                  <option value="" disabled>
                    Select certificate
                  </option>
                  <option value={Constants.CERT_ONE}>{Constants.CERT_ONE}</option>
                  <option value={Constants.CERT_TWO}>{Constants.CERT_TWO}</option>
                  <option value={Constants.CERT_THREE}>{Constants.CERT_THREE}</option>
                </Styled.StyledSelect>
              </Styled.StyledFormControl>
              <Error error={errors?.certificate} />
            </div>
            <div style={{ marginTop: '10px' }}>
              <Styled.StyledFormControl disabled={!values.certificate}>
                <Styled.StyledSelect className={classes.root} name="programme" onBlur={handleBlur} value={values.programme} onChange={(e)=>{
                  handleChange(e);
                  setFieldValue('year', '');
                }}>
                  <option value="" disabled>
                    Select programme
                  </option>
                  {
                    /* @ts-ignore */
                    values.school && values.certificate && selectCurrentEnrolledProgramme(values?.school, values?.certificate).map((item:string)=>(
                      <option key={nanoid()} value={item}>{item}</option>
                    ))
                  }
                </Styled.StyledSelect>
              </Styled.StyledFormControl>
              <Error error={errors?.programme} />
            </div>
            <div style={{ marginTop: '10px' }}>
              <Styled.StyledFormControl disabled={!values.programme}>
                <Styled.StyledSelect className={classes.root} name="year" onBlur={handleBlur} value={values.year} onChange={(e)=>{
                  handleChange(e);
                  setFieldValue('semester', '');
                }}>
                  <option value="" disabled>
                    Select year
                  </option>
                  {
                    <>
                      {
                        /* @ts-ignore */
                        values.certificate !== '' && selectYearFromUploadedCertificate(values?.certificate).map((item:string)=>(
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
                    <Styled.StyledButton disabled={!values.roomName || !values.school || !values.certificate || !values.programme || !values.year || !values.semester} onClick={submitForm}>
                      CREATE
                    </Styled.StyledButton>
                )
              }
            </div>
          </Grid>
        </FormikForm>
      )}
    </Formik>
  );
};

export default CreateRoom;