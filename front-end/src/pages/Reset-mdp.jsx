import React, { useState, useContext } from "react";
import { GetUrl } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../css/Reset-mdp.css";


function ResetMdp() {
    const [mail, setMail] = useState("");
    const myUrl = useContext(GetUrl);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ici, ajoutez la logique pour gérer la demande de réinitialisation du mot de passe.
        fetch(`${myUrl}/api/users/reset-mdp`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ mail })
        })
            .then(response => response.json())
            .then(data => {
                /* console.log('Réponse:',data, 21); */
                if (data.status === 1) {
                    toast.success(`Un e-mail de réinitialisation a été envoyé à l'adresse "${mail}".`);
                    navigate('/');
                } else {
                    toast.error(data.message);
                }


            })
            .catch(error => {
                console.error('Erreur:', error);
            });
    }
    return (
        <div className="password-reset">
            <h2>Réinitialisation du Mot de Passe</h2>
            <form onSubmit={handleSubmit}>
                <div className="champ-email">
                    <label>Email</label>
                    <input
                        type="email"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                    />
                </div>
                <button type="submit">Envoyer le Lien de Réinitialisation</button>
            </form>
        </div>
    );
}

export default ResetMdp;