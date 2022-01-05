import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const BackButton = ():JSX.Element => {
  const history = useHistory();
  const location = useLocation();
  const toPrevious = () =>{
    // @ts-ignore
    if (location.pathname.replaceAll('/', '') !== 'dashboard'){
      // @ts-ignore
      history.goBack();
    }
  };
  return (
        <Box style={{ marginBottom:'.5rem' }} >
            <ArrowBackIcon onClick={toPrevious} fontSize="small" />
        </Box>
  );
};

export default BackButton;