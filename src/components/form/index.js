import {useCallback, useState} from 'react';
import _ from 'lodash';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import {
  formatPrice,
  Section
} from '../../lib';
import Recap from '../recap';
import Criterion from '../criterion';
import NumberInput from '../number-input';
import Shape from '../shape';
import Decoupe from '../decoupes';
import MailForm from "../mail-form";
import {decoupes, services} from '../../data';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    marginTop: theme.spacing(2),
  },
  editable: {
    display: 'flex',
    width: '60%',
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
    decoupes,
    (value, id) => ({
      id,
      value: 0
    })
  ),
  services: _.map(
    services,
    (value, id) => ({
      id,
      value: false
    })
  ),
  isTvaReduced: false
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

function parseNumberField(str) {
  const number = parseInt(str, 10);

  if (_.isNumber(number) && !_.isNaN(number)) {
    return number;
  }

  return 0;
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

  function onFieldChanged(key, middlewares = [], {targetPath = 'target.value'} = {}) {
    return event => {
      const value = _.get(event, targetPath);
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

  function makeItems(criterionLabel, source) {
    if (criterionLabel !== 'epaisseur') {
      return Object.keys(source).map((key) => ({key, value: key}));
    }

    return _.map(
      source,
      (value, key) => ({
        key,
        value: key,
        labelValue: `${key} mm (${formatPrice(value)}/m2)`
      })
    );
  }

  function getCriterionData(criterionLabel) {
    switch (criterionLabel) {
      case 'materiau':
        return props.data.materiaux;
      case 'coloris':
        return _.get(props.data.materiaux, [state.materiau], []);
      case 'finition':
        return _.get(props.data.materiaux, [state.materiau, state.coloris], []);
      case 'epaisseur':
        return _.get(props.data.materiaux, [state.materiau, state.coloris, state.finition], []);
      default:
        return [];
    }
  }

  function buildItemValues(criterionLabel) {
    let criterionData = getCriterionData(criterionLabel);

    return makeItems(criterionLabel, criterionData);
  }

  const getPerUnit = useCallback(
    () => _.get(
      props.data.materiaux,
      [
        state.materiau,
        state.coloris,
        state.finition,
        state.epaisseur,
      ],
      0
    ),
    [
      props.data.materiaux,
      state.materiau,
      state.coloris,
      state.finition,
      state.epaisseur,
    ]
  );

  const getAmount = useCallback(
    () => {
      const perUnit = getPerUnit();

      return perUnit * state.largeur_plan * state.longueur_plan / 10000;
    },
    [
      state.largeur_plan,
      state.longueur_plan,
      getPerUnit,
    ]
  );

  const getDecoupesAmount = () => _.reduce(
    state.decoupes,
    (acc, cur) => {
      const decoupeAmount = props.data.decoupes[cur.id].price * cur.value;

      return acc + decoupeAmount;
    },
    0
  );

  const getServicesAmount = () => _.reduce(
    state.services,
    (acc, cur) => {
      const serviceAmount = props.data.services[cur.id].price * (cur.value ? 1 : 0);

      return acc + serviceAmount;
    },
    0
  );

  const getForme = useCallback(
    () => props.data.formes[state.forme].price,
    [
      state.forme,
      props.data.formes
    ]
  );

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
    </>
  );

  const shapeSection = (
    <>
      <Shape
        data={props.data.formes}
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
          <Decoupe
            data={props.data.decoupes}
            id={id}
            key={id}
            value={value}
            onChange={onFieldChanged(`decoupes[${index}].value`, [parseNumberField])}
          />
        </div>
      })}
    </div>
  );

  const serviceSection = (
    <FormGroup>
      {state.services.map(service => {
        const id = service.id;
        const index = _.findIndex(state.services, {id});
        const label = props.data.services[id].label;
        const value = state.services[index].value;

        return <FormControlLabel
          id={id}
          key={id}
          control={
            <Switch
              checked={value}
              onChange={onFieldChanged(`services[${index}].value`, [], {targetPath: 'target.checked'})}
            />
          }
          label={label}
        >
        </FormControlLabel>
      })}
    </FormGroup>
  );

  const tvaSection = (
    <FormGroup>
      <FormControlLabel
          control={
            <Switch
              checked={state.isTvaReduced}
              onChange={onFieldChanged('isTvaReduced', [], {targetPath: 'target.checked'})}
            />
          }
          label={'Habitation de plus de 2 ans TVA à 10% (TVA à 10% applicable aux logements à usage d\'habitation de plus de 2 ans si l\'installation est réalisée par nos soins. Sinon, TVA à 20%)'}
        >
      </FormControlLabel>
    </FormGroup>
  );

  const buildRecapLineSections = () => {
    const montantMateriau = getAmount();
    const montantForme = getForme();
    const montantDecoupes = getDecoupesAmount();
    const montantServices = getServicesAmount();
    const montantHt = montantMateriau + montantForme + montantDecoupes + montantServices;
    const tva = state.isTvaReduced
      ? 1.1
      : 1.2;
    const total = montantHt * tva;

    const res = [];

    const materiauSection = [{
      label: 'Sous-total plan',
      value: montantMateriau
    }];

    const formeSection = [{
      label: 'Sous-total chanfrein',
      value: montantForme
    }];

    const decoupeSection = [{
      label: 'Sous-total découpes',
      value: montantDecoupes
    }];

    const serviceSection = [{
      label: 'Sous-total services',
      value: montantServices
    }];

    const totalSection = [
      {
        label: 'Sous-total HT',
        value: montantHt
      },
      {
        label: state.isTvaReduced
          ? 'TVA à 10 %'
          : 'TVA à 20 %',
        value: total - montantHt
      },
      {
        label: 'Total TTC',
        value: total
      }
    ];

    res.push(materiauSection);
    res.push(formeSection);
    res.push(decoupeSection);
    res.push(serviceSection);
    res.push(totalSection);

    return res;
  }

  const recapLineSections = buildRecapLineSections();

  return (
    <div className={classes.form}>
      <div className={classes.editable}>
        <Section classes={classes} title={"1. Choix du matériau"} key="materiau">{materiauSection}</Section>
        <Section classes={classes} title={"2. Dimensions du plan"} key="plan">{planSection}</Section>
        <Section classes={classes} title={"4. Choix du chanfrein"} key="shape">{shapeSection}</Section>
        <Section classes={classes} title={"5. Choix des découpes"} key="decoupe">{decoupeSection}</Section>
        <Section classes={classes} title={"6. Nos services"} key="service">{serviceSection}</Section>
        <Section classes={classes} title={"7. TVA à appliquer"} key="tva">{tvaSection}</Section>

        <MailForm
          key="form"
          lineSections={recapLineSections}
        >
        </MailForm>
      </div>
      <div style={{
        minWidth: '30%'
      }}>
        <Recap
          key="recap"
          classes={classes}
          customStyle={{
            position: 'sticky',
            top: '16px'
          }}
          title={"Estimation du devis"}
          lineSections={recapLineSections}
        >
        </Recap>
      </div>
    </div>
  );
}

export default Form;
