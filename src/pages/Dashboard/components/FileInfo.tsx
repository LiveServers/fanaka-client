import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Form as FormikForm, Formik, FormikValues } from 'formik';
import { useLazyQuery } from '@apollo/client';
import * as Styled from './styles';
import { fileInfo, errorHandler } from '../../../apollo/reactiveVariables';
import GET_ALL_UNITS from '../../../graphql/queries/getAllUnits';
import Error from '../../../components/Errors';

const useStyles = makeStyles((theme)=>({
  infoGrid: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  root: {
    width: '348px',
    [theme.breakpoints.down('md')]:{
      width: '300px',
    },
  },
}));

const FileInfo = ()=>{
  const classes = useStyles();
  const history = useHistory();
  const [GetUnits, { loading, error, data }] = useLazyQuery(GET_ALL_UNITS);
  if (error) {
    errorHandler({
      open: true,
      message: 'Could not fetch units',
    });
  }
  const fetchUnits = async (courseCode:string) => {
  	await GetUnits({
      variables: {
        courseCode,
      },
    });
  };

  const handleNavigation = (values: FormikValues) => {
    // eslint-disable-next-line no-return-assign
    const id = data.getAllUnits.filter((item: any) => item.unitName === values.unit);
    fileInfo({ unit: values.unit, unitId: id[0]._id,
    });
    history.push('/admin-dashboard/attach-files');
  };
  return (
			<Formik
				initialValues={{
				  unit: '',
				  courseCode: '',
				}}

				onSubmit={async ()=>{
				  // submit this form

				}}

			>
				{({ handleChange, handleBlur, values, setFieldValue })=>(
					<>
						<FormikForm>
							<div className={classes.infoGrid}>
								<div style={{ marginTop: '10px' }}>
									<Styled.StyledFormControl>
										<Styled.StyledTextField value={values.courseCode} className={classes.root} onChange={(e)=>{
										  setFieldValue('courseCode', e.target.value, false);
										  fetchUnits(e.target.value.toUpperCase());
										}} onBlur={handleBlur} name="courseCode" placeholder="Course Code i.e BSCS 300" type="text" variant="filled" />
									</Styled.StyledFormControl>
								</div>
								<div style={{ marginTop: '10px' }} >
									<Styled.StyledFormControl>
										<Styled.StyledSelect className={classes.root} name="unit" onBlur={handleBlur} value={values.unit} onChange={handleChange}>
											<option value="" disabled>
												Select unit
											</option>
											{
												data && Array.isArray(data.getAllUnits) && data.getAllUnits.length > 0 && data.getAllUnits.map((item:any)=>(
													<option key={item?.unitName} value={item?.unitName}>{item?.unitName}</option>
												))
											}
										</Styled.StyledSelect>
									</Styled.StyledFormControl>
									<Error error={!loading && !error && data && data.getAllUnits.length < 1  ? 'No result for selection' : ''} />
								</div>
								<div style={{ marginTop: '20px' }}>
									<Styled.StyledButton disabled={!values.courseCode || !values.unit} onClick={()=>handleNavigation(values)}>
										Next
									</Styled.StyledButton>
								</div>
							</div>
						</FormikForm>
					</>
				)}
			</Formik>
  );
};

export default FileInfo;
