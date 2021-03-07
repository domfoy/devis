import _ from 'lodash';
import {useState} from 'react';

import brute from './brute.jpg';
import polie_cuve from './polie_cuve.jpg';
import polie_egouttoir from './polie_egouttoir.jpg';
import polie_rainures from './polie_rainures.jpg';
import polie_rainures_decaisse from './polie_rainures_decaisse.jpg';
import polie_rainures_decaisse_2 from './polie_rainures_decaisse_2.jpg';

import {makeStyles} from '@material-ui/core/styles';
import NumberInput from '../number-input';

import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 200
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
  },
}));

export const decoupes = {
  brute: {
    title: 'Découpe brute',
    image: brute,
    price: 50,
  },
  polie_cuve: {
    title: 'Découpe polie pour cuve sous le plan',
    image: polie_cuve,
    price: 90,
  },
  polie_rainures: {
    title: 'Découpe polie avec rainures sans décaissé',
    image: polie_rainures,
    price: 320,
  },
  polie_egouttoir: {
    title: 'Découpe polie avec égouttoir lisse et décaissé',
    image: polie_egouttoir,
    price: 390,
  },
  polie_rainures_decaisse: {
    title: 'Découpe polie avec rainures et décaissé ',
    image: polie_rainures_decaisse,
    price: 445,
  },
  polie_rainures_decaisse_2: {
    title: 'Découpe polie avec rainures et décaissé ',
    image: polie_rainures_decaisse_2,
    price: 495,
  },
}

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

function formatPrice(price) {
  return Intl.NumberFormat(
    'fr-FR',
    {
      style: 'currency',
      currency: 'EUR',
    }
  ).format(price);
}

export function Decoupe(props) {
  const classes = useStyles();

  const decoupe = decoupes[props.id];

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