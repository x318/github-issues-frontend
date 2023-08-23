import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Theme } from '@radix-ui/themes';
import { RouterProvider } from 'react-router-dom';

import { Toaster } from 'react-hot-toast';
import { store } from './store';

import '@radix-ui/themes/styles.css';
import 'react-loading-skeleton/dist/skeleton.css';
import './main.scss';
import router from './routes';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Theme accentColor="cyan" grayColor="sage">
        <RouterProvider router={router} />
        <Toaster />
      </Theme>
    </Provider>
  </React.StrictMode>,
);
