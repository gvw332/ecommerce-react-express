import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51O2YZFIzz2Dktgswd5bNSjalFuRXubc3By7h24thNwlEntQNM639JJZAdyGU438tCQUOzLU8jhCN93ZFidibkADf00QopYXYSM');
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </Router>

  </React.StrictMode>,
)