import fullMateriaux from './full-materiaux.json';

export const materiaux = fullMateriaux;

export const formes = {
  "aile_avion": {
    "price": 28,
    "title": "Chant aile d'avion"
  },
  demi_cercle: {
    "price": 20,
    "title": "Chant demi-cercle"
  },
  quart_cercle: {
    "price": 13,
    "title": "Chant quart-cercle"
  },
  standard: {
    "price": 7,
    "title": "Chant standard"
  }
};

export const decoupes = {
  brute: {
    title: 'Découpe brute',
    price: 50,
  },
  polie_cuve: {
    title: 'Découpe polie pour cuve sous le plan',
    price: 90,
  },
  polie_rainures: {
    title: 'Découpe polie avec rainures sans décaissé',
    price: 320,
  },
  polie_egouttoir: {
    title: 'Découpe polie avec égouttoir lisse et décaissé',
    price: 390,
  },
  polie_rainures_decaisse: {
    title: 'Découpe polie avec rainures et décaissé ',
    price: 445,
  },
  polie_rainures_decaisse_2: {
    title: 'Découpe polie avec rainures et décaissé ',
    price: 495,
  },
};

export const services = {
  priseCoteInf: {
    label: 'Prise de côte rayon < 50km',
    price: 90,
    exclusivityId: 'priseCote',
  },
  priseCoteSup: {
    label: 'Prise de côte rayon >= 50km',
    price: 170,
    exclusivityId: 'priseCote',
  },
  livInf: {
    label: 'Livraison rayon < 50km',
    price: 110,
    exclusivityId: 'livraison',
  },
  livSup: {
    label: 'Livraison rayon >= 50km',
    price: 190,
    exclusivityId: 'livraison',
  },
  poseInf: {
    label: 'Pose plan de travail <3 m2',
    price: 350,
    exclusivityId: 'pose',
  },
  poseMid: {
    label: 'Pose plan de travail >= 3 et <5 m2',
    price: 420,
    exclusivityId: 'pose',
  },
  poseSup: {
    label: 'Pose plan de travail >= 5 m2',
    price: 530,
    exclusivityId: 'pose',
  },
  raccord: {
    label: 'Raccordement évier et plaque de cuisson',
    price: 90,
  }
};
