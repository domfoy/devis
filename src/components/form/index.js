import {useState} from 'react';
import _ from 'lodash';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardContent';
import CardContent from '@material-ui/core/CardContent';
import InputAdornment from '@material-ui/core/InputAdornment';

import Criterion from '../criterion';
import NumberInput from '../number-input';
import Shape from '../shape';
import * as d from '../decoupes';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    marginTop: theme.spacing(2),
  },
  editable: {
    display: 'flex',
    flexGrow: 3,
    flexDirection: 'column',
  },
  decoupeSection: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  decoupeWrapper: {
    padding: theme.spacing(1)
  },
  summary: {
    position: 'sticky',
    top: theme.spacing(3)
  },
  outerSection: {
    padding: theme.spacing(1)
  },
  innerSection: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2)
  },
  sectionHeader: {
    fontSize: '1.2rem',
    textAlign: 'left'
  }
}));

const initialState = {
  materiau: '',
  coloris: '',
  finition: '',
  epaisseur: '',
  longueur_plan: 0,
  largeur_plan: 0,
  forme: 'standard',
  decoupes: _.map(
    d.decoupes,
    (value, id) => ({
      id,
      value: 0
    })
  )
};

const sizeAdornment = <InputAdornment position="end">mm</InputAdornment>;

function resetSubCriteria(criterionLabel) {
  switch (criterionLabel) {
    case 'materiau':
      return {
        coloris: '',
        finition: '',
        epaisseur: '',
      };
    case 'coloris':
      return {
        finition: '',
        epaisseur: '',
      };
    case 'finition':
      return {
        epaisseur: '',
      };
    default:
      return {};
  };
}

function makeItems(source) {
  return Object.keys(source).map((key) => ({key, value: key}));
}

function formatMoney(value) {
  return Intl.NumberFormat(
    'fr-FR',
    {
      style: 'currency',
      currency: 'EUR'
    }
  )
    .format(value);
}

function parseNumberField(str) {
  const number = parseInt(str, 10);

  if (_.isNumber(number) && !_.isNaN(number)) {
    return number;
  }

  return 0;
}

function Section(props) {
  return (
    <div className={props.classes.outerSection} style={props.customStyle}>
      <Card className={props.classes.innerSection}>
        <CardHeader
          className={props.classes.sectionHeader}
        >
          <span>{props.title}</span>
        </CardHeader>
        <CardContent>
          {props.children}
        </CardContent>
      </Card>
    </div>
  );
}

function Form(props) {
  const [state, setState] = useState(initialState);
  const classes = useStyles();

  function onCriterionChanged(criterionLabel) {
    return (event) => {
      const updatedSubCriteria = resetSubCriteria(criterionLabel);
      setState(
        Object.assign(
          {},
          state,
          updatedSubCriteria,
          {
            [criterionLabel]: event.target.value
          }
      ));
    };
  }

  function onFieldChanged(key, middlewares = []) {
    return event => {
      const value = event.target.value;
      let res = value;

      for (const fn of middlewares) {
        res = fn(res);
      }
      const newState = _.set(
        {
          ...state,
        },
        key,
        res
      );

      setState(newState);
    };
  }

  const onMateriauChanged = onCriterionChanged('materiau');
  const onColorisChanged = onCriterionChanged('coloris');
  const onFinitionChanged = onCriterionChanged('finition');
  const onEpaisseurChanged = onCriterionChanged('epaisseur');

  function getCriterionData(criterionLabel) {
    switch (criterionLabel) {
      case 'materiau':
        return props.data;
      case 'coloris':
        return _.get(props.data, [state.materiau], []);
      case 'finition':
        return _.get(props.data, [state.materiau, state.coloris], []);
      case 'epaisseur':
        return _.get(props.data, [state.materiau, state.coloris, state.finition], []);
      default:
        return [];
    }
  }

  function buildItemValues(criterionLabel) {
    let criterionData = getCriterionData(criterionLabel);

    return makeItems(criterionData);
  }

  function getAmount() {
    const perUnit = getPerUnit();
    return perUnit * state.largeur_plan * state.longueur_plan;
  }

  function getPerUnit() {
    return _.get(
      props.data,
      [
        state.materiau,
        state.coloris,
        state.finition,
        state.epaisseur,
      ],
      0
    );
  }

  const materiauSection = (
    <>
      <Criterion
        value={state.materiau}
        onChange={onMateriauChanged}
        label='Matériau'
        itemValues={buildItemValues('materiau')}
      ></Criterion>
      <Criterion
        value={state.coloris}
        onChange={onColorisChanged}
        label='Coloris'
        itemValues={buildItemValues('coloris')}
      ></Criterion>
      <Criterion
        value={state.finition}
        onChange={onFinitionChanged}
        label='Finition'
        itemValues={buildItemValues('finition')}
      ></Criterion>

      {formatMoney(getPerUnit())}
    </>
  );

  const planSection = (
    <>
      <NumberInput
        value={state.longueur_plan}
        onChange={onFieldChanged('longueur_plan', [parseNumberField])}
        label='Longueur'
        adornment={sizeAdornment}
      ></NumberInput>
      <NumberInput
        value={state.largeur_plan}
        onChange={onFieldChanged('largeur_plan', [parseNumberField])}
        label='Largeur'
        adornment={sizeAdornment}
      ></NumberInput>
      <Criterion
        value={state.epaisseur}
        onChange={onEpaisseurChanged}
        label='Épaisseur'
        itemValues={buildItemValues('epaisseur')}
      ></Criterion>
      {formatMoney(getAmount())}
    </>
  );

  const shapeSection = (
    <>
      <Shape
        value={state.forme}
        onChange={onFieldChanged('forme')}
      ></Shape>
    </>
  );

  const decoupeSection = (
    <div className={classes.decoupeSection}>
      {state.decoupes.map(decoupe => {
        const id = decoupe.id;
        const index = _.findIndex(state.decoupes, {id});
        const value = state.decoupes[index].value;

        return <div className={classes.decoupeWrapper}>
          <d.Decoupe
            id={id}
            key={id}
            value={value}
            onChange={onFieldChanged(`decoupes[${index}].value`, [parseNumberField])}
          />
        </div>
      })}
    </div>
  );

  return (
    <div className={classes.form}>
      <div className={classes.editable}>
        <Section classes={classes} title={"1. Choix du matériau"}>{materiauSection}</Section>
        <Section classes={classes} title={"2. Dimensions du plan"}>{planSection}</Section>
        <Section classes={classes} title={"4. Choix du chanfrein"}>{shapeSection}</Section>
        <Section classes={classes} title={"5. Choix des découpes"}>{decoupeSection}</Section>
      </div>
      <div>
        <Section classes={classes} customStyle={{
          position: 'sticky',
          top: '16px'
        }} title={"Estimation du devis"}>{"fzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz"}</Section>
      </div>
    </div>
  );
}

export default Form;
