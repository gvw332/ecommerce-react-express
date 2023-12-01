import React, { useState, useContext } from "react";
import { GetUrl } from "../App";
import { toast } from "react-toastify";

function ResetMdp() {
    const [email, setEmail] = useState("");
    const myUrl = useContext(GetUrl);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ici, ajoutez la logique pour gérer la demande de réinitialisation du mot de passe.
        fetch(`${myUrl}/api/users/password-reset`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        })
        .then(response => response.json())
        .then(data => {
            // Gérer la réponse, par exemple, informer l'utilisateur qu'un e-mail a été envoyé
            toast.info("Un e-mail de réinitialisation a été envoyé si l'adresse est dans notre base de données.");
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
    };

    return (
        <div className="password-reset">
            <h2>Réinitialisation du Mot de Passe</h2>
            <form onSubmit={handleSubmit}>
                <div className="champ-email">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="submit">Envoyer le Lien de Réinitialisation</button>
            </form>
        </div>
    );
}

export default ResetMdp;