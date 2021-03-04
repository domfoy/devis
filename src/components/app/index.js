import {useState} from 'react';
import _ from 'lodash';

import Criterion from '../criterion';
import NumberInput from '../number-input';

import data from './data';
import logo from './logo.svg';
import './App.css';

// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//   button: {
//     display: 'flex',
//     marginTop: theme.spacing(2),
//   }
// }));

const initialState = {
  materiau: '',
  coloris: '',
  finition: '',
  epaisseur: '',
  longueur_plan: 0,
  largeur_plan: 0,
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

function App() {
  const [state, setState] = useState(initialState);

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

  const onMateriauChanged = onCriterionChanged('materiau');
  const onColorisChanged = onCriterionChanged('coloris');
  const onFinitionChanged = onCriterionChanged('finition');
  const onEpaisseurChanged = onCriterionChanged('epaisseur');

  function getCriterionData(criterionLabel) {
    switch (criterionLabel) {
      case 'materiau':
        return data;
      case 'coloris':
        return _.get(data, [state.materiau], []);
      case 'finition':
        return _.get(data, [state.materiau, state.coloris], []);
      case 'epaisseur':
        return _.get(data, [state.materiau, state.coloris, state.finition], []);
      default:
        return [];
    }
  }

  function buildItemValues(criterionLabel) {
    let criterionData = getCriterionData(criterionLabel);

    return makeItems(criterionData);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{display: 'flex'}}>
          <Criterion
            value={state.materiau}
            handleChange={onMateriauChanged}
            typeLabel='Matériau'
            itemValues={buildItemValues('materiau')}
          ></Criterion>
          <Criterion
            value={state.coloris}
            handleChange={onColorisChanged}
            typeLabel='Coloris'
            itemValues={buildItemValues('coloris')}
          ></Criterion>
          <Criterion
            value={state.finition}
            handleChange={onFinitionChanged}
            typeLabel='Finition'
            itemValues={buildItemValues('finition')}
          ></Criterion>
          <Criterion
            value={state.epaisseur}
            handleChange={onEpaisseurChanged}
            typeLabel='Épaisseur'
            itemValues={buildItemValues('epaisseur')}
          ></Criterion>
        </div>
        <div style={{display: 'flex'}}>
          <NumberInput
            value={state.longueur_plan}
            handleChange={onFieldChanged('longueur_plan')}
            typeLabel='Longueur'
          ></NumberInput>
        </div>
      </header>
    </div>
  );
}

export default App;
