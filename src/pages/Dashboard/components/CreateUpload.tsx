import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useReactiveVar, useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Form as FormikForm, Formik } from 'formik';
import FilesDropZone from './FilesDropZone';
import { errorHandler, createUnit } from '../../../apollo/reactiveVariables';
import * as Styled from './styles';
import CREATE_UNIT from '../../../graphql/mutations/createUnit';

const useStyles = makeStyles((theme)=>({
  uploadGrid: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#F7F8FB',
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
  addIcon: {
    border: '1px solid #faf3f3',
    background: '#fff',
  },
}));

const Upload = ()=>{
  const classes = useStyles();
  const value = useReactiveVar(createUnit);
  const history = useHistory();
  const [CreateUnit, { loading }] = useMutation(CREATE_UNIT);

  React.useEffect(()=>{
    if (!value.year){
      history.push('/admin-dashboard/create-file-info');
    }
  }, [value]);
  return (
    <Formik
      initialValues={{
        images: [],
      }}

      onSubmit={async (values)=>{
        // submit this form
        await CreateUnit({
          variables: {
            input: {
              unitName: value.unit, files: values.images, semester: value.semester, year: value.year,
              school: value.school, certification: value.certification, programme: value.programme, courseCode: value.courseCode,
            },
          },
        }).then(()=> {
          createUnit({
            year: '',
            semester: '',
            unit: '',
            school: '',
            certification: '',
            programme: '',
            courseCode: '',
          });
          history.push('/admin-dashboard/create-file-info');
        }).catch(()=>{
          errorHandler({
            open: true,
            message: 'Could not upload your data',
          });
        });

      }}
    >
      {({ values, setFieldValue, submitForm })=>(
        <FormikForm>
          <div className={classes.uploadGrid}>
            <FilesDropZone setFieldValue={setFieldValue} classes={classes} />
            <div style={{ marginTop: '20px' }}>
              {
                loading ? <CircularProgress /> : (
                  <Styled.StyledButton disabled={values.images.length < 1} onClick={submitForm}>
                    Submit
                  </Styled.StyledButton>
                )
              }
            </div>
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Upload;
