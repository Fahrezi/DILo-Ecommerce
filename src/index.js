import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "./store/configStore";
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
// import Root from './simpleMondayRedux/root';
import * as serviceWorker from './serviceWorker';
import * as Sentry from '@sentry/browser';

const RELEASE = '0.1.0';
  Sentry.init({
    dsn: 'https://28b5deb96d794806bfefee3b508f94aa@sentry.io/1809291',
    release: RELEASE
  })

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
