import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ChipContext, { ChipProvider } from './Context/ChipContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChipProvider>
    <App />
  </ChipProvider>

);

reportWebVitals();