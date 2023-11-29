import React, { useState, useContext } from "react";
import "../css/Addproduct.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GetUrl } from "../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Addproduct() {

  const [inputs, setInputs] = useState({
    title: "",   // Valeur par défaut vide pour le champ "Titre"
    price: "",   // Valeur par défaut vide pour le champ "Prix"
    details: ""  // Valeur par défaut vide pour le champ "Détails"
  });
  const [error,setError] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const myUrl = useContext(GetUrl)
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'image') {
      const file = e.target.files[0];
      setImage(file);
    } else {
      setInputs(values => ({ ...values, [name]: value }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', inputs.title);
    formData.append('price', inputs.price);
    formData.append('details', inputs.details);
    if (image) {
      formData.append('image', image, image.name);
    }
    console.log(image, formData, inputs);
    axios.post(myUrl + '/ajout-produit/', formData)
      .then((response) => {
        setError('');
        console.log(response.data.status, 44);
        if (response.data.status === 1) {
          toast.success('Nouveau produit bien enregistré', {
            position: toast.POSITION.TOP_CENTER,
          });
          navigate('/')
        }else{
          setError('Ce titre existe déjà avec une autre image');
        }

      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données : " + error);
      });
  }


  return (
    <div className="Addproduct-page">
      <h2>Ajout produit</h2>
      <form onSubmit={handleSubmit}>
        <div className="ajout-image">
          <label>Image:</label>
          <input
            type="file" name="image"
            onChange={handleChange}
          />
          {image && <img src={URL.createObjectURL(image)} alt="Aperçu de l'image" />}
        </div>
        <div>
          <div className="error-title">{error}</div>
          <label>Titre:</label>
          <input
            type="text" name="title"
            value={inputs.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Prix:</label>
          <input
            type="number" name="price"
            value={inputs.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Détails:</label>
          <textarea
            name="details"
            value={inputs.details}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  )
}

export default Addproduct;