import _ from 'lodash';
import {
  useCallback,
  useState
} from 'react';

import aile_avion from './aile_avion.jpg';
import demi_cercle from './demi_cercle.jpg';
import quart_cercle from './quart_cercle.jpg';
import standard from './standard.jpg';

import {makeStyles} from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const imageContents = {
  aile_avion,
  demi_cercle,
  quart_cercle,
  standard,
};

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

function CardImage(props) {
  return (
    <Card>
      <CardActionArea style={{display: 'flex', flexDirection: 'column'}}>
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
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const buildImages = useCallback(
    () => _.mapValues(
      props.data,
      (value, key) => ({
        ...value,
        priceLabel: value.price !== 0
          ? `${value.price} € le ml`
          : 'Offert',
        url: imageContents[key]
      })
    ),
    [
      props.data
    ]
  );

  const images = buildImages(props.data);
  const image = images[props.value];

  if (!image) {
    return null;
  }

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    toggleMode();
  }

  const button = <ButtonBase
    className={classes.root}
    onClick={handleClick}
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
        anchorEl={anchorEl}
        keepMounted
        open={state === 'choice'}
        onClose={toggleMode}
      >
        {
          _.map(
            images,
            (image, key) => <MenuItem
              key={key}
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