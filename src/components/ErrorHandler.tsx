import React from 'react';
import { useReactiveVar } from '@apollo/client';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { errorHandler } from '../apollo/reactiveVariables';

const  ErrorHandler = ()=>{
  const handler = useReactiveVar(errorHandler);
  return (
		<Snackbar
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			open={handler.open}
			autoHideDuration={6000}
			onClose={()=>errorHandler({
			  open: false,
			  message: '',
			})}
		>
			<MuiAlert onClose={()=>errorHandler({
			  open: false,
			  message: '',
			})} elevation={6} severity="error" variant="filled">
				{handler.message}
			</MuiAlert>
		</Snackbar>
  );
};
export default ErrorHandler;
