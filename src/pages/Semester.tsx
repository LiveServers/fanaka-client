import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery, useMutation, useReactiveVar } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Formik, Form as FormikForm } from 'formik';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CancelIcon from '@material-ui/icons/Cancel';
import Grid from '@material-ui/core/Grid';
import { nanoid } from 'nanoid';
import * as Yup from 'yup';
import * as Interfaces from '../InterfacesEnumsTypes/Interfaces/Interfaces';
import CARD_DATA_QUERY from '../graphql/queries/cardData';
import { CREATE_SEMESTER } from '../graphql/mutations/createSemester';
import { SEMESTER_QUERY } from '../graphql/queries/getAllSemester';
import SemesterCard from '../components/Cards/SemesterCard';
import { semesterCardProps, breadCrumbList } from '../apollo/reactiveVariables';

const useStyles = makeStyles(()=>({
  cardGrid:{
    display:'grid',
    gridTemplateColumns:'50% 50%',
    gridTemplateRow:'minmax(50%,50%)',
    placeItems:'center',
    gridGap:'6%',
  },
  textField: {
    backgroundColor: 'white',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#000',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: 35,
    },
    '& .Mui-focused': {
      borderColor: '#00AFAA',
    },
    '& .MuiOutlinedInput-marginDense': {
      borderColor: '#00AFAA',
    },
    borderRadius: 35,
    width: '100%',
  },
}));

const SemesterValidation = Yup.object().shape({
  semester:Yup.string().required('This field is required'),
});

const Semester = (props:any): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const { data } = useQuery(CARD_DATA_QUERY);
  const semester:Interfaces.Semester = data.cardData;
  const [CreateSemesterMutation] = useMutation(CREATE_SEMESTER);
  const valueFromBCrumbs = useReactiveVar(breadCrumbList);
  const { data:semesterData, loading } = useQuery(SEMESTER_QUERY, {
    variables:{
      year:semester.text,
    },
    fetchPolicy:'cache-first',
  });

  const handleClick = React.useCallback(()=>{setOpen(!open);}, [open]);
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handlePassSemesterProps = (year:string, semester:string, path:string, _id:string)=>{
    semesterCardProps({
      year,
      semester,
      path,
      _id,
    });
    const newPath = `${path}/${semester}/${_id}`;
    const bcrumbsValue: Interfaces.BreadCrumbs = {
      name: semester,
      path:newPath,
    };
    history.push(`${path}/${semester}/${_id}`);
    breadCrumbList([...valueFromBCrumbs, bcrumbsValue]);
  };
  return (

        <>
            <div data-testid="semestercards" className={classes.cardGrid}>
                {
                  // eslint-disable-next-line @typescript-eslint/no-shadow
                    (!loading && semesterData) && semesterData.getAllSemesters.map(({ year, semester, path, _id }:Interfaces.SemesterCardProps)=>(
                        <SemesterCard handlePassSemesterProps={handlePassSemesterProps} key={nanoid()} year={year} semester={semester} path={path} _id={_id} />
                    ))
                }
            </div>
            <Formik
                initialValues={{
                  semester:'',
                }}

                onSubmit={(values)=>{
                  // submit your form here
                  CreateSemesterMutation({
                    variables:{
                      input:{
                        semester:values.semester,
                        year:semester.text,
                        // eslint-disable-next-line react/destructuring-assignment
                        path:props.location.pathname,
                      },
                    },
                    refetchQueries:[{
                      query: SEMESTER_QUERY,
                      variables:{
                        year:semester.text,
                      },
                    }],
                  });
                  setOpen(!open);
                }}

                validationSchema={SemesterValidation}
            >
                {({ handleChange, handleBlur, submitForm, values, errors })=> open && (
                                <Grid container alignItems="center" justify="center">
                                    <FormikForm>
                                        <TextField
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.semester}
                                            error={Boolean(errors.semester)}
                                            className={classes.textField}
                                            type="text"
                                            name="semester"
                                            autoComplete="off"
                                            margin="dense"
                                            variant="outlined"
                                        />

                                    </FormikForm>
                                    <IconButton onClick={submitForm} color="secondary" size="small">
                                        <AddBoxIcon />
                                    </IconButton>
                                </Grid>

                )
                    }
            </Formik>
            {
                open ? (
                    <IconButton data-testid="open" onClick={handleClick} color="secondary" size="small">
                        <CancelIcon />
                    </IconButton>
                ) : (
                    <IconButton data-testid="closed" id="closed" onClick={handleClick} color="secondary" size="small">
                        <AddBoxIcon />
                    </IconButton>
                )
            }
        </>
  );
};

export default React.memo(Semester);
