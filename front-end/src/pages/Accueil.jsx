import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import "../css/Accueil.css";
import Card from "../components/Card";
import { UserContext } from "../App";
import { GetUrl } from "../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSquareXTwitter } from "react-icons/fa6";
import { TiSocialLinkedin } from "react-icons/ti";
import { FaConnectdevelop } from "react-icons/fa6";
import Modal from "../components/Modal";
import "../css/Modal.css";


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

    const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
    const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);

    const openTermsModal = () => setIsTermsModalOpen(true);
    const closeTermsModal = () => setIsTermsModalOpen(false);
    const openLegalModal = () => setIsLegalModalOpen(true);
    const closeLegalModal = () => setIsLegalModalOpen(false);



    return (
        <>
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

            <div className="footer">
                <ul className="res-soc">
                    <a href="https://twitter.com/BachiBoo" className="twitter" target="_blank">
                        <li><FaSquareXTwitter /></li>
                    </a>
                    <a href="https://www.linkedin.com/in/gaël-van-wymeersch-20267087/" className="linkedin" target="_blank">
                        <li><TiSocialLinkedin /></li>
                    </a>
                    <a href="https://portfolio.gvw-tech.be" className="portfolio" target="_blank">
                        <li><FaConnectdevelop /></li>
                    </a>
                </ul>
                <ul className="rules">
                    <Modal />
                </ul>
            </div>
        </>

    )
}

export default Accueil;
