import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useQuery, useReactiveVar } from '@apollo/client';
import { nanoid } from 'nanoid';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';
import * as Styled from './styles';
import { errorHandler, fileView } from '../../../apollo/reactiveVariables';
import FETCH_FILES_FOR_SPECIFIC_UNIT from '../../../graphql/queries/fetchFilesForSpecificUnit';

const useStyles = makeStyles((theme)=>({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#CBA552',
    width: 60,
    height: 30,
    color: '#fff',
    border: 0,
  },
  txt: {
  	fontSize: '16px',
  },
  paper: {
  	width: '348px',
    [theme.breakpoints.down('md')]: {
  		width: '300px',
    },
  },
  spacing: {
  	marginTop: theme.spacing(2),
  },
}));

const UploadFilesView = () => {
  const { root, btn, paper, spacing, txt } = useStyles();
  const history = useHistory();
  const value = useReactiveVar(fileView);
  const { data, loading, error } = useQuery(FETCH_FILES_FOR_SPECIFIC_UNIT, {
    variables: {
      id:value.unitId,
    },
  });
  React.useEffect(()=>{
    if (!value.unit){
      history.push('/admin-dashboard/uploaded-files-info');
    }
  }, [value]);
  React.useEffect(()=>{
    if (error){
      errorHandler({
        open: true,
        message: 'Could not fetch files',
      });
    }
  }, [error]);

  const sliceLongFileNames = (name:string) => {
    name = name.slice(0, 20);
    return `${name}...`;
  };
  return (
		<div className={root}>
			{
				loading ? (
						<CircularProgress />
				) : (
						<>
							{
								data && data.fetchFilesForSpecificUnit !== null ? data.fetchFilesForSpecificUnit.fileNames.map((item:string, index:number)=>(
									<Styled.StyledPaper className={clsx(paper, index !== 0 && spacing)} elevation={3} key={nanoid()}>
										<Typography className={txt} variant='body1'>
											{sliceLongFileNames(item)}
										</Typography>
										<button type="button" className={btn}>READ</button>
									</Styled.StyledPaper>
								)) : !error && <p>No files found</p>
							}
						</>
				)
			}
		</div>
  );
};

export default UploadFilesView;
