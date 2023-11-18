import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/Accueil.css";
import Card from "../components/Card";
import { useUserContext } from "../App";
import { readMode } from "../App";


function Accueil() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [myURL, setMyURL] = useState('');
    const { user, setUser } = useUserContext();
    const isAdmin = (user.niveau === 1);
    const [shouldFetchProducts, setShouldFetchProducts] = useState(false);

    useEffect(() => {
        setMyURL(readMode());
    }, []);

    useEffect(() => {
        if (myURL) {
            setShouldFetchProducts(true);
        }
    }, [myURL]);

    useEffect(() => {
        if (shouldFetchProducts) {
            getProducts();
            setShouldFetchProducts(false);
        }
    }, [shouldFetchProducts]);

    function getProducts() {
        console.log('axios:',myURL);
        //axios.get('http://localhost:80/api-php-react/produits')
        axios.get(myURL + '/produits/')
            .then( (response)=> {
               
                if (response.data){                    
                    setData(response.data);
                    console.log("Réponse success",data);
                    setLoading(false);
                }
            })
            .catch(function (error) {
                console.error("Erreur lors de la récupération des données : " + error);
            });
    }



    // useEffect(() => {
    //     // Utilisez Axios pour récupérer les données depuis votre API
    //     axios.get("http://localhost:80/api-php-react/produits")
    //         .then((response) => {
    //             setData(response.data); // Mettez à jour l'état avec les données reçues
    //             setLoading(false); // Mettez à jour l'état de chargement
    //         })
    //         .catch((error) => {
    //             console.error("Erreur lors de la récupération des données : " + error);
    //         });
    // }, []); // Le tableau vide [] signifie que cela s'exécute une seule fois après le rendu initial





    return (
        <div className="accueil">

            {isAdmin && <div className="btn-ajout-produit">
                <Link to="/add-product">
                    <button class="custom-btn btn-12"><span>+</span><span>Ajouter un produit</span></button>
                </Link></div>
            }

            <h1>Liste des produits</h1>
            {loading ? (
                <p>Chargement en cours...</p>
            ) : (
                <div className="cards-container">
                    {Array.isArray(data) ? (
                        data.map((item, key) => (

                            <div className="card-accueil">
                                <Card
                                    id={item.id}
                                    key={key}
                                    image={`images/${item.image}`}
                                    title={item.title}
                                    price={item.price}
                                    details={item.details}
                                    item={item}
                                />
                            </div>

                        ))
                    ) : (
                        <p>Les données ne sont pas un tableau valide.</p>
                        
                    )}
                </div>
            )}

        </div>
    )
}

export default Accueil;
