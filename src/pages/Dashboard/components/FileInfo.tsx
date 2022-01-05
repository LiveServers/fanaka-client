import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as Styled from './styles';

const useStyles = makeStyles(()=>({
  infoGrid: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const FileInfo = ()=>{
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  const [state, setState] = React.useState('');
  const handleChange = (e:React.ChangeEvent<{ value: unknown }>)=>{
    console.log(e.target);
  };
  return (
  	<div className={classes.infoGrid}>
			<Styled.StyledFormControl>
				<Styled.StyledSelect value={state} onChange={handleChange}>
					<option value="" disabled>
						Select year of study
					</option>
					<option value={10}>Ten</option>
					<option value={20}>Twenty</option>
					<option value={30}>Thirty</option>
				</Styled.StyledSelect>
			</Styled.StyledFormControl>
			<div style={{ marginTop: '39px' }} >
				<Styled.StyledFormControl>
					<Styled.StyledSelect value={state} onChange={handleChange}>
						<option value="" disabled>
							Select semester
						</option>
						<option value={10}>Ten</option>
						<option value={20}>Twenty</option>
						<option value={30}>Thirty</option>
					</Styled.StyledSelect>
				</Styled.StyledFormControl>
			</div>
			<div style={{ marginTop: '39px' }} >
			<Styled.StyledFormControl>
				<Styled.StyledSelect value={state} onChange={handleChange}>
					<option value="" disabled>
						Select unit
					</option>
					<option value={10}>Ten</option>
					<option value={20}>Twenty</option>
					<option value={30}>Thirty</option>
				</Styled.StyledSelect>
			</Styled.StyledFormControl>
			</div>
			<div style={{ marginTop: '40px' }}>
				<Styled.StyledButton>
					Next
				</Styled.StyledButton>
			</div>
		</div>
  );
};

export default FileInfo;
