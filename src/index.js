import React from 'react';
import ReactDOM from 'react-dom/client';
import MainRoutes from './routes';
import './styles.css'
import {BrowserRouter} from 'react-router-dom'
import { ContextProvider } from './Context/context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <MainRoutes />
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);