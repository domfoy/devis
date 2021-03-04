import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import reportWebVitals from './reportWebVitals';

let rootId = 'root';

if (process.env.NODE_ENV === 'production') {
  rootId = 'devis-root';
}
const target = document.getElementById(rootId);

if (target) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    target
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
