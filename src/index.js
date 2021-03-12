import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import reportWebVitals from './reportWebVitals';

import defaultData from './data';

function getRootId() {
  if (process.env.NODE_ENV === 'production') {
    return 'devis-root';
  }

  return 'root';
}

function fetchJsonData() {
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

function bootApp(_target, _data) {
  if (!_target) {
    return;
  }
  ReactDOM.render(
    <React.StrictMode>
      <App data={_data}/>
    </React.StrictMode>,
    target
  );
}

const rootId = getRootId();
const target = document.getElementById(rootId);

if (process.env.NODE_ENV === 'production') {
  fetchJsonData()
    .then(jsonData => {
      if (jsonData) {
        bootApp(target, jsonData);
      } else {
        bootApp(target, defaultData);
      }
    })
} else {
  bootApp(target, defaultData);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
