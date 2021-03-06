import {useState} from 'react';
import _ from 'lodash';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardContent';
import CardContent from '@material-ui/core/CardContent';

import Criterion from '../criterion';
import NumberInput from '../number-input';
import Shape from '../shape';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    marginTop: theme.spacing(2),
  },
  editable: {
    display: 'flex',
    flexDirection: 'column',
  },
  summary: {
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
  forme: 'standard'
};

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
    <div className={props.classes.outerSection}>
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

      setState({
        ...state,
        [key]: res
      })
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
        typeLabel='Matériau'
        itemValues={buildItemValues('materiau')}
      ></Criterion>
      <Criterion
        value={state.coloris}
        onChange={onColorisChanged}
        typeLabel='Coloris'
        itemValues={buildItemValues('coloris')}
      ></Criterion>
      <Criterion
        value={state.finition}
        onChange={onFinitionChanged}
        typeLabel='Finition'
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
        typeLabel='Longueur'
      ></NumberInput>
      <NumberInput
        value={state.largeur_plan}
        onChange={onFieldChanged('largeur_plan', [parseNumberField])}
        typeLabel='Largeur'
      ></NumberInput>
      <Criterion
        value={state.epaisseur}
        onChange={onEpaisseurChanged}
        typeLabel='Épaisseur'
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

  return (
    <div className={classes.form}>
      <div className={classes.editable}>
        <Section classes={classes} title={"1. Choix du matériau"}>{materiauSection}</Section>
        <Section classes={classes} title={"2. Dimensions du plan"}>{planSection}</Section>
        <Section classes={classes} title={"3. Choix de la forme"}>{shapeSection}</Section>
      </div>
      <div className={classes.summary}>
        <Section classes={classes} title={"Estimation du devis"}>{"coucou"}</Section>
      </div>
    </div>
  );
}

export default Form;
