import { useState, useEffect } from "react";
import React from 'react';
import "../css/Details.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Details = () => {
  const [details, setDetails] = useState({})
  const { title } = useParams();
  const navigate = useNavigate();
  const formData = new FormData();
  const [shouldFetchProducts, setShouldFetchProducts] = useState(false);
  formData.append('title', title);
  useEffect(() => {
    getProduct()
  }, []);

  function getProduct() {
    axios.post('http://localhost:80/api-php-react/detail/', formData).then(function (response) {
      console.log(response.data);
      if (response.data === 'N\'existe pas'){
        navigate('/Page404/');
      }else{
        setDetails(response.data);
      }
      
    }).catch(function (error) {
      console.log(error);
    });
  }
  function addToCart() {
    console.log('Adding to cart');
  }
  return (

    <div className="details">

      <img src={'/images/' + details.image} />
      <h3>{details.title}</h3>
      <p>{details.price} €</p>

      {details && <p dangerouslySetInnerHTML={{ __html: details.details }}></p>}
      {/* <p>{details.details}</p> */}
      <button onClick={addToCart}>Ajouter au panier</button>
    </div>
  );


};

export default Details;