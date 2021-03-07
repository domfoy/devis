import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

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
    <FormHelperText id="standard-weight-helper-text">{props.label}</FormHelperText>

    <Input
      value={props.value}
      onChange={props.onChange}
      endAdornment={props.adornment}
      inputProps={{
        'aria-label': props.label,
      }}
    />
  </FormControl>;
}

export default NumberInput;