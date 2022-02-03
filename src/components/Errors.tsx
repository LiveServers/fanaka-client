import React from 'react';
import Typography from '@material-ui/core/Typography';

interface Props {
  error: string | undefined
}

const Error = ({ error }: Props): JSX.Element => (
		<Typography color="secondary" style={{ fontSize: '.8rem' }} variant="body1">
			{error}
		</Typography>
);

export default Error;
