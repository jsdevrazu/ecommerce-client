import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import StoreProvider from './app/store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StoreProvider>
  <Router>
    <App />
  </Router>
  </StoreProvider>
);