import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App node={document.getElementById('container')} />
  </React.StrictMode>,
  document.getElementById('root')
);
