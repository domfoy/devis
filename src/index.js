import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import reportWebVitals from './reportWebVitals';

import {
  decoupes,
  formes,
  materiaux,
  services,
} from './data';

function getRootId() {
  if (process.env.NODE_ENV === 'production') {
    return 'devis-root';
  }

  return 'root';
}

function fetchMateriaux() {
  const jsonPath = `${process.env.PUBLIC_URL}/data.json`;

  return fetch(
    jsonPath,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  )
    .then(response => response.json())
    .catch(err => {
      console.log(`Error when fetching "${jsonPath}"`, err);
    });
}

function bootApp(_target, data) {
  if (!_target) {
    return;
  }
  ReactDOM.render(
    <React.StrictMode>
      <App data={data}/>
    </React.StrictMode>,
    target
  );
}

const rootId = getRootId();
const target = document.getElementById(rootId);

if (process.env.NODE_ENV === 'production') {
  fetchMateriaux()
    .then(fetchedMateriaux => {
      if (fetchedMateriaux) {
        const data = {
          decoupes,
          formes,
          materiaux: fetchedMateriaux,
          services,
        };

        bootApp(target, data);
      } else {
        const data = {
          decoupes,
          formes,
          materiaux,
          services,
        };

        bootApp(target, data);
      }
    });
} else {
  const data = {
    decoupes,
    formes,
    materiaux,
    services,
  };

  bootApp(target, data);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
