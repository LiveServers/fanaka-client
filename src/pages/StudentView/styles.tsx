import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';

export const StyledCheckbox = withStyles(()=>({
  root: {
    color: '#000',
  },
}))(Checkbox);

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

