import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import SearchBarProvider from './context/SearchBarContext';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SearchBarProvider>
        <App />
      </SearchBarProvider>
    </Provider>
  </React.StrictMode >,
  document.getElementById('root')
);
