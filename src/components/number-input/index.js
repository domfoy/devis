import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

function NumberInput(props) {
  const classes = useStyles();

  return <FormControl
    className={clsx(classes.margin, classes.withoutLabel, classes.textField)}
  >
    <Input
      id="standard-adornment-weight"
      value={props.value}
      onChange={props.handleChange}
      endAdornment={<InputAdornment position="end">mm</InputAdornment>}
      aria-describedby="standard-weight-helper-text"
      inputProps={{
        'aria-label': 'weight',
      }}
    />
    <FormHelperText id="standard-weight-helper-text">Longueur</FormHelperText>
  </FormControl>;
}

export default NumberInput;