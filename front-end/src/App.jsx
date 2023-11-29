import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "react-use-cart";

import Navigation from "./components/Navigation";
import Accueil from "./pages/Accueil";
import Login from "./pages/Login";
import Inscription from "./pages/Inscription";
import Addproduct from "./pages/Addproduct";
import Details from "./pages/Details";
import Panier from "./pages/Panier";
import Paiement from "./pages/Paiement";
import SuccessPaiement from "./pages/Success-Paiement";
import { Page404 } from "./pages/Page404";


export const UserContext = createContext();
export const GetUrl = createContext();

function App() {
  const [user, setUser] = useState({}); // Définissez votre état utilisateur ici

  const apiUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000'
      : 'https://api.gvw-tech.be';

      useEffect(() => {
        // Charger l'utilisateur à partir du sessionStorage au montage du composant
        try {
          const savedUser = JSON.parse(sessionStorage.getItem('user'));        
      
          if (savedUser && savedUser.pseudo) { // Ajoutez une condition pour vérifier si 'savedUser' est valide
            setUser(savedUser);
          }
        } catch (error) {
          console.error("Erreur lors du chargement de l'utilisateur du sessionStorage", error);
        }
      }, []);
      
      useEffect(() => {
        // Mise à jour du sessionStorage lorsque 'user' change
        if (user && user.pseudo) { // Ajoutez une condition pour vérifier si 'user' est valide avant de sauvegarder
          sessionStorage.setItem('user', JSON.stringify(user));
        }else{
          localStorage.removeItem('react-use-cart');
        }
      }, [user]);
      
  return (
    <div>
      <CartProvider>
        <GetUrl.Provider value={apiUrl}>
          <UserContext.Provider value={{ user, setUser }}>
            <Navigation />
            <Routes>
              <Route path="/" element={<Accueil />} />
              <Route path="/login" element={<Login />} />
              <Route path="/inscription" element={<Inscription />} />
              <Route path="/add-product" element={<Addproduct />} />
              <Route path="/details/:title" element={<Details />} />
              <Route path="/panier" element={<Panier />} />
              <Route path="/paiement" element={<Paiement />} />
              <Route path="/success-paiement" element={<SuccessPaiement />} />              
              <Route path="*" element={<Page404 />} />
            </Routes>
          </UserContext.Provider>
        </GetUrl.Provider>
      </CartProvider>
    </div>
  );
}

export default App;

