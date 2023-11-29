import React, { useState,useContext  } from "react";
import "../css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetUrl } from "../App";

function Login() {
    const navigate = useNavigate();
    const [mail, setMail] = useState("");
    const [mdp, setMdp] = useState("");
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const { user, setUser } = useContext(UserContext);
    const myUrl = useContext(GetUrl);


    const handleSubmit = (e) => {

        e.preventDefault();
        const formData = new FormData();
        formData.append('mail', mail);
        formData.append('mdp', mdp);


        axios.post(`${myUrl}/login/`, formData)
            .then((response) => {
                
                const userData = response.data.user;
                if (response.data.message === 'Connexion réussie') {
                    toast.success(`Connexion réussie, bienvenue  ${userData.pseudo}`, {
                        position: toast.POSITION.TOP_CENTER,
                    });
                    // Créez un objet "niveaux" pour stocker les niveaux de l'utilisateur
                    const niveaux = {
                        isAdmin: userData.niveau === 1,
                        isAuth: userData.niveau >= 1,
                    };
                    // Mettez à jour l'objet utilisateur avec les niveaux
                    const userWithNiveaux = { ...userData, niveaux };

                    // Utilisez setUser pour mettre à jour l'utilisateur avec les niveaux
                    setUser(userWithNiveaux);
                    navigate('/');
                } else {
                    setError('Mauvais identifiant');
                }
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données : " + error);
            });

    }

    return (
        <div className="login-page">
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
                <div className="champ-email">
                    <label>Email</label>
                    <input
                        type="email"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                    />
                </div>
                <div className="champ-mdp">
                    <label>Mot de passe</label>
                    <input
                        type="password"
                        value={mdp}
                        onChange={(e) => setMdp(e.target.value)}
                    />
                </div>
                <div className="link-mdp">
                    <Link to="/">Mot de passe oublié ?</Link>
                </div>
                <br />
                <div className="link-inscri">
                    <Link to="/inscription">Pas encore inscrit ?</Link>
                </div>
                <br />
                <button>Se connecter</button>
                <br />
                <div className="error-login">{error}</div>

            </form>
        </div>
    );
}

export default Login;


