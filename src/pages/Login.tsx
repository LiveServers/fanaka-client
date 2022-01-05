import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Formik, Form as FormikForm } from 'formik';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { LOGIN_MUTATION } from '../graphql/mutations/login';

const Login:React.FC = () : JSX.Element =>{
  const [LoginMutation] = useMutation(LOGIN_MUTATION);
  const history = useHistory();
  return (
        <Formik
        initialValues={{
          email:'',
          password:'',
        }}

        onSubmit={(values)=>{
          // submit request here
          LoginMutation({
            variables:{
              email:values.email,
              password:values.password,
            },
          });

          history.push('/dashboard');
        }}
        >
        {({ handleChange, handleBlur, submitForm, values, errors })=>(
            <FormikForm>
                <Grid container alignItems="flex-start" direction="column" spacing={2}>
                    <Grid item xs={12} sm={12} lg={12} xl={12}>
                        <TextField
                            name="email"
                            value={values.email}
                            error={Boolean(errors.email)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="Email"
                            />
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12} xl={12}>
                        <TextField
                            name="password"
                            value={values.password}
                            error={Boolean(errors.password)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="Password"
                            />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={submitForm} >Submit</Button>
                    </Grid>
                </Grid>
            </FormikForm>
        )}
        </Formik>
  );
};

export default Login;
