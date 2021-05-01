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
    item => <MenuItem key={item.key} value={item.key}>{item.labelValue || item.value}</MenuItem>
  );
}

function mkRenderValue(criterionLabel, items) {
  return (value) => {
    const item = _.find(
      items,
      {value}
    );

    return criterionLabel === 'Épaisseur'
      ? `${item.value} mm`
      : item.value;
  }
}

function Criterion(props) {
  const classes = useStyles();

  if (props.itemValues.length === 1 && props.itemValues[0].key === '') {
    return null;
  }
  const items = buildItems(props.itemValues);
  const renderValue = mkRenderValue(props.label, props.itemValues);

  return <FormControl className={classes.formControl}>
    <InputLabel id="demo-controlled-open-select-label">{props.label}</InputLabel>

    <Select
      disabled={!items.length}
      value={props.value}
      onChange={props.onChange}
      renderValue={renderValue}
    >{items}</Select>
  </FormControl>;
}

export default Criterion;