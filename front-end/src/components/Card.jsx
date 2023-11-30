import React, { useContext } from 'react';
import "../css/Card.css";
import { useCart } from 'react-use-cart';
import { useNavigate, useParams } from 'react-router-dom';
import { GetUrl } from '../App'; // Chemin mis à jour
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../App";


const Card = (props) => {
  const myUrl = useContext(GetUrl);
  const { addItem } = useCart();
  const navigate = useNavigate();
  const handleDetails = (title) => {
    navigate('/details/' + title);
  };
  const { user, setUser } = useContext(UserContext);
  const isAdmin = (user.niveau === 1);
  const {id} = useParams();
  
  const handleDelete = (id) => {
    
    props.setRefresh(true);
    const formData = new FormData();
    formData.append('id', id);

    var requestOptions = {
      method: 'DELETE',   
      body: '',        
      redirect: 'manual'
    };

    fetch(myUrl + '/api/produits/' + `${id}`, requestOptions)
    .then(response => response.json())

    .then(data => {

        console.log(data, 48);
        
       
        if (data.status === 1) {
            toast.success('Produit bien supprimé', {
                position: toast.POSITION.TOP_CENTER,
            });
            navigate('/');
        }
    })
    .catch(error => console.error('Erreur :', error));
  };
  const handleContextMenu = (e) => {
    e.preventDefault();
  };



  return (
    <div className="card">
      <div onClick={() => handleDetails(props.title)} className='click-pour-details'>

        <img onContextMenu={handleContextMenu} src={`${myUrl}/${props.image}`} alt={props.title} />
        
        <h3>{props.title}</h3>
        <p>{props.price} €</p>
      </div>
      <button className="btn-ajouter-au-panier" onClick={() => addItem(props.item)}>Ajouter au panier</button>
      {isAdmin &&
        <button className="btn-delete-produit" onClick={() => handleDelete(props.id)}>Supprimer</button>
      }

    </div>
  );
};

export default Card;