import React, { useState, useContext } from "react";
import "../css/Inscription.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetUrl } from "../App";


function Inscription() {
  const [pseudo, setPseudo] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [mail, setMail] = useState("");
  const [mdp, setMdp] = useState("");
  const [mdpbis, setMdpbis] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const myUrl = useContext(GetUrl);

  const handleInscription = (e) => {

    e.preventDefault();
    const data = {
      'pseudo': pseudo,
      'nom': nom,
      'prenom': prenom,
      'mail': mail,
      'mdp': mdp,
      'mdpbis': mdpbis

    };
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify(data),
      redirect: 'manual',
      headers: {
        "Content-Type": "application/json"
      }
    };
    fetch(`${myUrl}/api/users/`, requestOptions)
    .then(response => response.json())

    .then(data => {

        console.log(data, 54);
        
      
        if (data.status === 1) {
            toast.success('Vous êtes bien enregistré', {
                position: toast.POSITION.TOP_CENTER,
            });           
            navigate('/');
        } else {
            setError(data.message);
        }
    })
    .catch(error => console.error('Erreur :', error));
  }

  return (
    <div className="inscription-page">
      <h2>Inscription</h2>
      <form>
        <div className="champ-prenom">
          <label>Pseudo</label>
          <input
            type="text"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
          />
        </div>
        <div className="champ-nom">
          <label>Nom</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>
        <div className="champ-prenom">
          <label>Prénom</label>
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
        </div>

        <div className="champ-email">
          <label>Email</label>
          <input
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
        </div>
        <div className="champ-mdp">
          <label>Mdp</label>
          <input
            type="password"
            value={mdp}
            onChange={(e) => setMdp(e.target.value)}
          />
        </div>
        <div className="champ-mdp-bis">
          <label>Confirmation mdp</label>
          <br></br>
          <input
            type="password"
            value={mdpbis}
            onChange={(e) => setMdpbis(e.target.value)}
          />
        </div>
        <button onClick={handleInscription}>S'inscrire</button>
        <br></br>
        {error && <div className="error-inscription" dangerouslySetInnerHTML={{ __html: error }}></div>}
      </form>
    </div>
  )
}

export default Inscription;
