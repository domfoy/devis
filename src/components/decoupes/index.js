import _ from 'lodash';

import brute from './brute.jpg';
import polie_cuve from './polie_cuve.jpg';
import polie_egouttoir from './polie_egouttoir.jpg';
import polie_rainures from './polie_rainures.jpg';
import polie_rainures_decaisse from './polie_rainures_decaisse.jpg';
import polie_rainures_decaisse_2 from './polie_rainures_decaisse_2.jpg';

import NumberInput from '../number-input';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import formatPrice from '../../format-price';
import {useCallback} from 'react';

const imageContents = {
  brute,
  polie_cuve,
  polie_egouttoir,
  polie_rainures,
  polie_rainures_decaisse,
  polie_rainures_decaisse_2,
};

function InputCardImage(props) {
  return (
    <Card style={{
      width: 250,
      height: 300,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <CardContent>
        <img
          src={props.src}
          alt={props.title}
          style={{
            display: 'block',
            maxWidth: '75%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        />
        <Typography gutterBottom>
          {props.title}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {props.comment}
        </Typography>
      </CardContent>
      <div style={{
        width: '50%',
        minWidth: '50px',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: '16px'
      }}>
        <NumberInput
          value={props.value}
          onChange={props.onChange}
          label={props.label}
        >
        </NumberInput>
      </div>
    </Card>
  );
}



export default function Decoupe(props) {
  const buildDecoupes = useCallback(
    () => {
      return _.mapValues(
        props.data,
        (value, key) => ({
          ...value,
          image: imageContents[key]
        })
      );
    },
    [
      props.data
    ]
  );

  const decoupes = buildDecoupes(props.data);
  const decoupe = decoupes[props.id];
  if (!decoupe) {
    return null;
  }

  return (
    <InputCardImage
      src={decoupe.image}
      title={decoupe.title}
      comment={formatPrice(decoupe.price)}
      value={props.value}
      onChange={props.onChange}
    />
  );
}