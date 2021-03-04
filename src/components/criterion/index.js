import _ from 'lodash';

import {makeStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function buildItems(items) {
  return _.map(
    items,
    item => <MenuItem key={item.key} value={item.key}>{item.value}</MenuItem>
  );
}

function Criterion(props) {
  const classes = useStyles();
  const items = buildItems(props.itemValues);

  return <FormControl className={classes.formControl}>
    <InputLabel id="demo-controlled-open-select-label">{props.typeLabel}</InputLabel>

    <Select
      value={props.value}
      onChange={props.handleChange}
    >{items}</Select>
  </FormControl>;
}

export default Criterion;