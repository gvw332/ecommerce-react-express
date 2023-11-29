import React, { useContext } from "react";
import "../css/Navigation.css";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import { UserContext } from "../App";
import { PiShoppingCartBold } from "react-icons/pi";
import { IoTrashOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navigation() {
  const { totalItems } = useCart();
  const { user, setUser } = useContext(UserContext);
  const isAuth = (user.niveau >= 1)
  const { emptyCart } = useCart();
  
  const handleLogout = () => {
    // Utilisez window.confirm pour demander une confirmation à l'utilisateur
    const confirmLogout = window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?");

    if (confirmLogout) {
      setUser({});
      emptyCart();
      sessionStorage.clear();
    }
  };


  return (
    <nav>
      
      <Link to="/" className="logo"></Link>

      <div className="auth">
        {(isAuth) &&
          <div className="bienvenue"><h5>Bonjour: {user.pseudo}</h5>
            
          </div>
        }
        {(isAuth) &&
          <button onClick={handleLogout}>Déconnexion</button>
        }
        {(!isAuth) &&
          <Link to="/login"><button>Connexion</button></Link>
        }
        {(!isAuth) &&
          <Link to="/inscription"><button>Inscription</button></Link>
        }
        <div className="bouton-panier-compteur">
          <Link to="/panier" className="cart-button"><PiShoppingCartBold className="panier-nav"/><div className="total-panier-nav">{totalItems}</div></Link>
        </div>
        <ToastContainer />
      </div>
    </nav>
  );
}
