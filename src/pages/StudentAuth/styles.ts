import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

export const StyledSelect = withStyles(()=>({
  root: {
    backgroundColor: '#fff',
    borderRadius: 10,
    outline:' 0.1px solid #000',
    paddingLeft: '35px',
    height: '40px',
    '& .MuiNativeSelect-icon': {
      paddingRight: '39px',
    },
    '& .MuiInput-underline':{
      borderBottom: '0 !important',
    },
  },
}))(NativeSelect);

export const StyledFormControl = withStyles(()=>({
  root: {
    borderBottom: '0 !important',
    '& .MuiInputBase-root > .MuiNativeSelect-icon': {
      paddingRight: '39px',
    },
    '& .MuiInput-underline:after':{
      content:'""',
      borderBottom: '0 !important',
    },
    '& .MuiInput-underline:before':{
      content:'""',
      borderBottom: '0 !important',
    },
    '& .MuiFilledInput-underline:before': {
      content:'""',
      borderBottom: '0 !important',
    },
    '& .MuiFilledInput-underline:after': {
      content:'""',
      borderBottom: '0 !important',
    },
  },
}))(FormControl);

export const StyledButton = withStyles(()=>({
  root: {
    width: '108px',
    height: '40px',
    textAlign: 'center',
    color: '#000',
    backgroundColor: '#CBA552',
  },
}))(Button);

export const StyledTextField = withStyles(()=>({
  root:{
    borderRadius: 10,
    '& .MuiFilledInput-input':{
      padding: '0 0 0 35px !important',
      height: '55px',
      backgroundColor: '#fff',
      borderRadius: 10,
      outline:' 0.1px solid #000',
    },
    '&::placeholder':{
      color: 'black !important',
    },
    color: '#000',
  },
}))(TextField);

export const StyledPaper = withStyles(()=>({
  root: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '25px 19px 25px 25px',
  },
}))(Paper);
