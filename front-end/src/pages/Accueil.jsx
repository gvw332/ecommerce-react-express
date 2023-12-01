import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import "../css/Accueil.css";
import Card from "../components/Card";
import { UserContext } from "../App";
import { GetUrl } from "../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Accueil() {
    const [data, setData] = useState([]);    
    const myUrl = useContext(GetUrl);
    const { user, setUser } = useContext(UserContext);
    const isAdmin = (user.niveau === 1);
    
    
    useEffect(() => {
        getProducts();       
    }, []);

    const handleProductDelete = (deletedProductId) => {
        const updatedProducts = data.filter(product => product.id !== deletedProductId);
        setData(updatedProducts);
      };
    function getProducts() {
        var requestOptions = {
            method: 'GET',           
            redirect: 'manual'
          };

        fetch(`${myUrl}/api/produits`, requestOptions)
      
            .then(response => response.json())

            .then(data => {
                
                setData(data.produits);
            })
            .catch(error => console.error('Erreur :', error));

    }


    return (
        <div className="accueil">

            {isAdmin && <div className="btn-ajout-produit">
                <Link to="/add-product">
                    <button className="custom-btn btn-12"><span>+</span><span>Ajouter un produit</span></button>
                </Link></div>
            }

            <h1>Liste des produits</h1>

                <div className="cards-container">
                    {Array.isArray(data) ? (
                        data.map((item, key) => (
                            <div className="card-accueil" key={key}>
                                <Card
                                    id={item.id}
                                    key={key}
                                    image={`images/${item.image}`}
                                    title={item.title}
                                    price={item.price}
                                    details={item.details}
                                    item={item}
                                    onDelete={handleProductDelete}

                                />
                            </div>
                        ))
                    ) : (
                        <p>Les données ne sont pas un tableau valide.</p>

                    )}
                </div>
            

        </div>
    )
}

export default Accueil;
