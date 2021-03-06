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
  },
  textField: {
  },
}));

function NumberInput(props) {
  const classes = useStyles();

  return <FormControl
    className={clsx(classes.margin, classes.withoutLabel, classes.textField)}
  >
    <FormHelperText id="standard-weight-helper-text">{props.typeLabel}</FormHelperText>

    <Input
      value={props.value}
      onChange={props.handleChange}
      endAdornment={<InputAdornment position="end">mm</InputAdornment>}
      inputProps={{
        'aria-label': props.typeLabel,
      }}
    />
  </FormControl>;
}

export default NumberInput;