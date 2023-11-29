import { useState, useEffect, useContext } from "react";
import React from 'react';
import "../css/Details.css";
import { useParams } from "react-router-dom";
// import axios from "axios";
import { useNavigate} from "react-router-dom";
import { GetUrl } from '../App'; // Chemin mis à jour
import { useCart } from 'react-use-cart';

const Details = () => {
  const myUrl = useContext(GetUrl);
  const [details, setDetails] = useState({})
  const { title } = useParams();
  const navigate = useNavigate();
  const formData = new FormData();
  const { addItem } = useCart();
  const [shouldFetchProducts, setShouldFetchProducts] = useState(false);
  

  formData.append('title', title);
  useEffect(() => {
    getProduct()
  }, []);

  // console.log(`${myUrl}/detail/`, 21);

  function getProduct() {

    fetch(myUrl + '/api/produits/' + `${title}`, { method: "GET" })
    .then(res => res.json())

    .then(data => {
        /* toast.success(Element ${id} supprimé, {
            position: toast.POSITION.TOP_CENTER,
        }); */
        // Mettre à jour la liste des produits après la suppression
        setDetails(data);
        console.log(data, 36);
    })
    .catch(error => console.error('Erreur :', error));


  }


  const handleContextMenu = (e) => {
    e.preventDefault();
  };


  return (

    <div className="details">

      <img onContextMenu={handleContextMenu} src={`${myUrl}/images/${details.image}`} />
      <h3>{details.title}</h3>
      <p>{details.price} €</p>

      {details && <p dangerouslySetInnerHTML={{ __html: details.details }}></p>}
      <button onClick={() => addItem(details)}>Ajouter au panier</button>
    </div>
  );


};

export default Details;