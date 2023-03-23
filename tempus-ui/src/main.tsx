import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import App from './App';
import { store } from './redux/store';

import './styles/index.scss';

dayjs.extend(duration);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
