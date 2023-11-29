import React, { useContext } from 'react';
import "../css/Card.css";
import { useCart } from 'react-use-cart';
import { useNavigate } from 'react-router-dom';
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
  const handleDelete = (id) => {
    // console.log('delete', id);
    const formData = new FormData();
    formData.append('id', id);
    axios.post(myUrl + '/delete/', formData)
      .then((response) => {
        // console.log(response.data, 20);
        if (response.data.status === 1) {
          toast.success('Produit bien supprimé', {
            position: toast.POSITION.TOP_CENTER,
          });
          props.onDelete();
          navigate('/')
        } else {
          toast.error('Erreur de suppression', {
            position: toast.POSITION.TOP_CENTER,
          });

        }

      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données : " + error);
      });
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