import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';

export const StyledSelect = withStyles(()=>({
  root: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingLeft: '35px',
    width: '348px',
    height: '52px',
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
    width: '350px',
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
  },
}))(FormControl);

export const StyledButton = withStyles(()=>({
  root: {
    width: '108px',
    height: '40px',
    textAlign: 'center',
    color: '#000',
    backgroundColor: '#fff',
  },
}))(Button);
