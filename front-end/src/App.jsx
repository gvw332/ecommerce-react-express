import React, { useState } from "react";
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

export const readMode = () => {
  if (process.env.NODE_ENV === 'development') return 'http://localhost:80/api-php-react';
  if (process.env.NODE_ENV === 'production') return 'https://api.gvw-tech.be';
}

// Créez un contexte pour l'état de l'utilisateur
const UserContext = React.createContext();

function App() {
  const [user, setUser] = useState({}); // Définissez votre état utilisateur ici

  return (
    <div>
      <CartProvider>
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
      </CartProvider>
    </div>
  );
}

export default App;

// Utilisez ce hook personnalisé pour accéder à l'état utilisateur dans vos composants
export function useUserContext() {
  return React.useContext(UserContext);
}