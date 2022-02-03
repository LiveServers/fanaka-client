import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Form as FormikForm, Formik, FormikValues } from 'formik';
import { useLazyQuery } from '@apollo/client';
import * as Styled from './styles';
import { errorHandler, fileView } from '../../../apollo/reactiveVariables';
import GET_ALL_UNITS from '../../../graphql/queries/getAllUnits';
import Errors from '../../../components/Errors';

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

const UploadedFilesInfo = ()=>{
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
    fileView({
      unit: values.unit,  unitId: id[0]._id,
    });
    history.push('/admin-dashboard/uploaded-files-view');
  };
  return (
		<Formik
			initialValues={{
			  courseCode:'',
			  unit: '',
			}}

			onSubmit={async ()=>{
			  // submit this form

			}}

			// validationSchema={LoginValidation}
		>
			{({ handleChange, handleBlur, values, setFieldValue })=>(
				<FormikForm>
					<div className={classes.infoGrid}>
						<div>
							<Styled.StyledFormControl>
								<Styled.StyledTextField value={values.courseCode} className={classes.root} onChange={(e)=>{
								  setFieldValue('courseCode', e.target.value, false);
								  fetchUnits(e.target.value.toUpperCase());
								}} onBlur={handleBlur} name="courseCode" placeholder="Course Code i.e BSCS 300" type="text" variant="filled" />
							</Styled.StyledFormControl>
						</div>
						<div style={{ marginTop: '39px' }} >
							<Styled.StyledFormControl disabled={!values.courseCode || loading || Boolean(error) || !data || data.getAllUnits.length < 1}>
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
							<Errors error={!loading && !error && data && data.getAllUnits.length < 1  ? 'No result for selection' : ''} />
						</div>
						<div style={{ marginTop: '40px' }}>
							<Styled.StyledButton disabled={!values.courseCode || !values.unit} onClick={()=>handleNavigation(values)}>
								Next
							</Styled.StyledButton>
						</div>
					</div>
				</FormikForm>
			)}
		</Formik>
  );
};

export default UploadedFilesInfo;
