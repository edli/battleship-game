import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store'

import App from './App';

import './index.css';


const target = document.getElementById('root')

const store = configureStore();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    target
);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      target,
    )
  })
}
