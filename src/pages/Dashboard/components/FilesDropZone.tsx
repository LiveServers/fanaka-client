import React from 'react';
import { useDropzone } from 'react-dropzone';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

interface ClassProps {
  dropZone: string
  dropText:string
  textFileName: string
}

interface Props {
  classes: ClassProps
}

const FilesDropZone = ({ classes }:Props)=>{
  // const handleDrop = React.useCallback((acceptedFiles, fileRejections) => {
  //   if (acceptedFiles.length >= 6 && content.imagesOfExperience.length <= 6){
  //     setFieldValue('imagesOfExperience', acceptedFiles, false);
  //     dispatch(stepperContent({
  //       imagesOfExperience:[...acceptedFiles],
  //       detailsOfExperience:content.detailsOfExperience,
  //     }));
  //   } else if (fileRejections.length > 0 && Array.isArray(fileRejections)){
  //     dispatch(errorHandler('Upload images of type jpeg and png only', true, 'warning'));
  //     setFieldValue('imagesOfExperience', [], false);
  //     dispatch(stepperContent({
  //       imagesOfExperience: [],
  //       detailsOfExperience: content.detailsOfExperience,
  //     }));
  //   } else {
  //     dispatch(errorHandler('Please upload 6 or more images', true, 'warning'));
  //     setFieldValue('imagesOfExperience', [], false);
  //     dispatch(stepperContent({
  //       imagesOfExperience: [],
  //       detailsOfExperience: content.detailsOfExperience,
  //     }));
  //   }
  // }, [setFieldValue]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: ()=>{},
    accept: 'image/jpeg, image/png',
  });

  // const handleRemoveItem = (index:number)=>{
  //   content.imagesOfExperience.splice(index, 1);
  //   setFieldValue('imagesOfExperience', [...content.imagesOfExperience], false);
  //   return dispatch(stepperContent({
  //     imagesOfExperience:[...content.imagesOfExperience],
  //     detailsOfExperience: content.detailsOfExperience,
  //   }));
  // };
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
				{/* <Grid container alignItems="flex-start" direction="column"> */}
				{/*	{content.imagesOfExperience !== (null || undefined || []) ? ( */}
				{/*		<ul style={{paddingLeft:"30px"}}> */}
				{/*			<Grid container direction="column" alignItems="flex-start" spacing={2} > */}
				{/*				{ */}
				{/*					content.imagesOfExperience.map((item,index)=>( */}
				{/*						<Grid  key={index} style={{marginBottom:".7rem"}} container alignItems="flex-start" spacing={2}> */}
				{/*							<li>{item.name}</li> */}
				{/*							<IconButton style={{fontSize:".7rem",marginLeft:".5rem",padding:"0"}} className={classes.addIcon} size="small" color="secondary" aria-label="add to list"> */}
				{/*								<DeleteOutlineIcon size="inherit" /> */}
				{/*							</IconButton> */}
				{/*						</Grid> */}
				{/*					)) */}
				{/*				} */}
				{/*			</Grid> */}
				{/*		</ul> */}
				{/*	):null} */}
				{/* </Grid> */}
			</Grid>
		</>
  );
};


export default FilesDropZone;
