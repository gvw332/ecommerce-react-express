import React from "react";
import { useCart } from 'react-use-cart';

function SuccessPaiement(props) {
  const { emptyCart } = useCart();
  { emptyCart() };
  return <h1>Succès de vos transactions, Merci pour vos achats! 🎉</h1>;
}

export default SuccessPaiement;