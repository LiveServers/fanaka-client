import React from 'react';
import { useDropzone } from 'react-dropzone';
import { nanoid } from 'nanoid';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useReactiveVar } from '@apollo/client';
import { errorHandler, files } from '../../../apollo/reactiveVariables';

interface ClassProps {
  dropZone: string
  dropText:string
  textFileName: string
  addIcon: string
}


interface Props {
  classes: ClassProps
  setFieldValue: any
}

const FilesDropZone = ({ classes, setFieldValue }:Props)=>{
  const theme = useTheme();
  const images = useReactiveVar(files);

  React.useEffect(()=>{
  	setFieldValue('images', [...images], false);
  }, [images]);

  const isMobileTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrop = React.useCallback((acceptedFiles, fileRejections) => {
    if (acceptedFiles && Array.isArray(acceptedFiles) && acceptedFiles.length > 0){
    	files([...images, ...acceptedFiles]);
    } else if (fileRejections.length > 0 && Array.isArray(fileRejections)){
      errorHandler({
        open: true,
        message: 'Please upload only pdf, ppt and docx files',
      });
      setFieldValue('images', [], false);
    } else {
      errorHandler({
        open: true,
        message: 'Could not upload files',
      });
      setFieldValue('images', [], false);
    }
  }, [setFieldValue, images]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: '.pdf',
  });

  const handleRemoveItem = (index:number)=>{
    files([...images.filter((_: File, i: number)=>i !== index)]);
  };
  const sliceLongFileNames = (name:string) => {
  	name = name.slice(0, 7);
  	return `${name}...`;
  };
  return (
		<>
			<div {...getRootProps({ className: classes.dropZone })}>
				<input {...getInputProps()} />
				<p className={classes.dropText}>Drag n drop some files here, or click to select files</p>
			</div>
			<Grid item>
				<Typography className={classes.textFileName} variant="h6">
					Files Uploaded
				</Typography>
				 <Grid container alignItems="flex-start" direction="row">
					{images !== ([]) ? (
						<ul style={{ paddingLeft:'30px' }}>
							<Grid wrap={isMobileTablet ? 'wrap' : 'nowrap'} container direction={isMobileTablet ? 'column' : 'row'} alignItems="flex-start">
								{
									images.map((item:File, index:number)=>(
										<Grid  key={nanoid()} style={{ marginBottom:'.7rem', marginRight: '2rem' }} container alignItems="flex-start" spacing={2}>
											<li>{sliceLongFileNames(item.name)}</li>
											<IconButton onClick={()=>handleRemoveItem(index)} style={{ fontSize:'.7rem', marginLeft:'.5rem', padding:'0' }} className={classes.addIcon} size="small" color="secondary" aria-label="add to list">
												<DeleteOutlineIcon />
											</IconButton>
										</Grid>
									))
								}
							</Grid>
						</ul>
					) : null}
				 </Grid>
			</Grid>
		</>
  );
};


export default FilesDropZone;
