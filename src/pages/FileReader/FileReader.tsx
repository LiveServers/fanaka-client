import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useReactiveVar } from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { setFile } from '../../apollo/reactiveVariables';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const FileReader = ({ classes, fileName, setActive, isMobileTablet }:any) => {
  const [numPage, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const file = useReactiveVar(setFile);
  const onDocumentLoadSuccess = ({ numPages }:any)=> {
    setNumPages(numPages);
  };
  const handleBack = () => {
    if (pageNumber === 1){
      setPageNumber(1);
    } else {
      setPageNumber((prev)=>prev - 1);
    }
  };
  const handleForward = () => {
    if (numPage !== null && pageNumber === numPage){
      setPageNumber(numPage);
    } else {
      setPageNumber((prev)=>prev + 1);
    }
  };
  return (
    <div className={classes.filereaderRoot}>
      <Grid direction="row" container alignItems="center" justify="space-between">
        <IconButton onClick={()=>setActive('')} className={classes.backButton}>
          <ArrowBackIosIcon fontSize="large" />
        </IconButton>
        <Typography variant="body1">
          {fileName}
        </Typography>
      </Grid>
      <Document
        file={file}
        onLoadError={console.error}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<CircularProgress />}
      >
        <Page width={isMobileTablet && 300} pageNumber={pageNumber} loading={<CircularProgress />} />
      </Document>
      <p>Page {pageNumber} of {numPage}</p>
      <Grid direction="row" container alignItems="center" justify="center" spacing={2}>
        <IconButton onClick={handleBack} className={classes.backButton}>
          <ArrowBackIosIcon fontSize="large" />
        </IconButton>
        <IconButton onClick={handleForward} className={classes.backButton}>
          <ArrowForwardIosIcon fontSize="large" />
        </IconButton>
      </Grid>
    </div>
  );
};

export default FileReader;
