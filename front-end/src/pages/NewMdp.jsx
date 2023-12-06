import React, { useState, useContext, useEffect } from "react";
import "../css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetUrl } from "../App";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";




function NewMdp() {
    const navigate = useNavigate();
    const [mail, setMail] = useState("");
    const [mdp, setMdp] = useState("");
    const [mdpbis, setMdpbis] = useState("");
    const [token, setToken] = useState("");
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");

    const myUrl = useContext(GetUrl);
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    useEffect(() => {
        getInfosMail();
    }, []);

    const getInfosMail = () => {
        const queryString = window.location.search;

        // Supprimer le '?' initial de la chaîne de requête
        const params = new URLSearchParams(queryString);

        // Récupérer la valeur d'un paramètre spécifique
        const mail = params.get('mail');
        const token = params.get('token');
        setMail(mail);
        setToken(token);
        

    }
    const handleSubmit = (e) => {

        e.preventDefault();

        const data = {
            'mail': mail,
            'mdp': mdp,
            'mdpbis': mdpbis,
            'token': token,

        };

        var requestOptions = {
            method: 'POST',
            body: JSON.stringify(data),
            redirect: 'manual',
            headers: {
                "Content-Type": "application/json"
            }
        };
        fetch(`${myUrl}/api/users/new-mdp`, requestOptions)
            .then(response => response.json())

            .then(data => {

                if (data.status === 1) {
                    toast.success(`Le nouveau mot de passe a été validé. Vous allez recevoir un email de confirmation.  `, {
                        position: toast.POSITION.TOP_CENTER,
                    });

                    // Utilisez setUser pour mettre à jour l'utilisateur avec les niveaux

                    navigate('/');
                } else {
                    setError(data.message);
                    if (data.status === 2) {
                        toast.error(`Les mots de passe ne correspondent pas`, {
                            position: toast.POSITION.TOP_CENTER,
                        });
                    } else {
                        toast.error(`Ce token est expiré , refaites la procédure du mdp oublié`, {
                            position: toast.POSITION.TOP_CENTER,
                        });
                        navigate('/');
                    }


                }
            })
            .catch(error => console.error('Erreur :', error));
    }

    return (
        <div className="login-page">
            <h2>Nouveau mot de passe</h2>
            <form onSubmit={handleSubmit}>
                <div>Email: {mail}</div>
                <br />
                {/* <div>Token: {token}</div> */}
              
                <div className="champ-mdp">
                    <label>Nouveau mot de passe</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={mdp}
                        onChange={(e) => setMdp(e.target.value)}
                    />
                    <span onClick={togglePasswordVisibility}>
                        {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                    </span>
                </div>
                <div className="champ-mdp-bis">
                    <label>Confirmation du Mot de passe</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={mdpbis}
                        onChange={(e) => setMdpbis(e.target.value)}
                    />
                    <span onClick={togglePasswordVisibility}>
                        {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                    </span>
                </div>

                <br />
                <button>Envoyer</button>
                <br />
                <div className="error-login">{error}</div>

            </form>
        </div>
    );
}

export default NewMdp;