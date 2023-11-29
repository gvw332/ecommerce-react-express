

import React, { useState, useEffect, useContext } from 'react';
import { useCart } from 'react-use-cart';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from './CheckOutForm';
import axios from 'axios';
import { GetUrl } from "../App";


const PUBLIC_KEY = 'pk_test_51O2YZFIzz2Dktgswd5bNSjalFuRXubc3By7h24thNwlEntQNM639JJZAdyGU438tCQUOzLU8jhCN93ZFidibkADf00QopYXYSM';

const StripeContainer = () => {
    const myUrl = useContext(GetUrl);
    const [clientSecret, setClientSecret] = useState('');
    const [loading, setLoading] = useState(true);
    const {
        items
    } = useCart();

    useEffect(() => {


        
        axios.post(`${myUrl}/paiement/`, JSON.stringify({ items: items }))
            .then((res) => {                
                setClientSecret(res.data.clientSecret);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching clientSecret:', error);
                setLoading(false); // Set loading to false in case of an error
            });
    }, []);

    const stripePromise = loadStripe(PUBLIC_KEY);

    const appearance = {
        theme: 'stripe',
    };

    const options = {
        clientSecret,
        appearance,
    };


    return (
        <>
            {clientSecret &&
                <Elements options={options} stripe={stripePromise}>
                    <CheckOutForm panier={items} />
                </Elements>
            }
          
        </>
    );
};

export default StripeContainer;