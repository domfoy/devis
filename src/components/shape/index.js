import _ from 'lodash';
import {useState} from 'react';

import aile_avion from './aile_avion.jpg';
import demi_cercle from './demi_cercle.jpg';
import quart_cercle from './quart_cercle.jpg';
import standard from './standard.jpg';

import {makeStyles} from '@material-ui/core/styles';
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

const images = {
  aile_avion: {
    priceLabel: '28€ le ml',
    title: 'Chant aile d\'avion',
    url: aile_avion,
  },
  demi_cercle: {
    priceLabel: '20€ le ml',
    title: 'Chant demi-cercle',
    url: demi_cercle,
  },
  quart_cercle: {
    priceLabel: '13€ le ml',
    title: 'Chant quart-cercle',
    url: quart_cercle,
  },
  standard: {
    priceLabel: 'offert',
    title: 'Chant standard',
    url: standard,
  },
}

function CardImage(props) {
  return (
    <Card>
      <CardActionArea>
        <img
          src={props.src}
          alt={props.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
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
      </CardActionArea>
    </Card>
  );
}

function Shape(props) {
  const [state, setState] = useState('initial');
  const classes = useStyles();

  const image = images[props.value];

  const mkSelectShape = (shape) => {
    return () => {
      props.onChange({target:{ value: shape}});
      toggleMode();
    }
  };

  const toggleMode = () => {
    setState(
      state === 'initial'
        ? 'choice'
        : 'initial'
    )
  };

  const button = <ButtonBase
    className={classes.root}
    onClick={toggleMode}
  >
    <CardImage
      src={image.url}
      title={image.title}
      comment={image.priceLabel}
    />
  </ButtonBase>;
  return (
    <>
      {button}
      <Menu
        id="simple-menu"
        anchorEl={button}
        keepMounted
        open={state === 'choice'}
        onClose={toggleMode}
      >
        {
          _.map(
            images,
            (image, key) => <MenuItem
              onClick={mkSelectShape(key)}
            >
              <CardImage
                src={image.url}
                title={image.title}
                comment={image.priceLabel}
              />
            </MenuItem>
          )
        }
      </Menu>
    </>
  );
}

export default Shape;