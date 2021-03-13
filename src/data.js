export const materiaux = {
  'Granit': {
    'Noir Galaxy': {
      'Poli': {
        '20': 399,
        '30': 518
      }
    },
    'Noir Angola': {
      'Poli': {
        '20': 269,
        '30': 339,
      }
    }
  },
  'Silestone': {
    'Blanco city': {
      'Poli': {
        '12': 265,
        '20': 299,
      }
    },
    'Blanco norte': {
      'Poli': {
        '12': 265,
        '20': 299
      }
    }
  }
};

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
    "price": 0,
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
  },
  priseCoteSup: {
    label: 'Prise de côte rayon >= 50km',
    price: 170,
  },
  livInf: {
    label: 'Livraison rayon < 50km',
    price: 110,
  },
  livSup: {
    label: 'Livraison rayon >= 50km',
    price: 190,
  },
  poseInf: {
    label: 'Pose plan de travail <3 m2',
    price: 350,
  },
  poseMid: {
    label: 'Pose plan de travail >= 3 et <5 m2',
    price: 420,
  },
  poseSup: {
    label: 'Pose plan de travail >= 5 m2',
    price: 530,
  },
  raccord: {
    label: 'Raccordement évier et plaque de cuisson',
    price: 90,
  }
};
