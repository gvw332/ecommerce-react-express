import { PaymentElement } from "@stripe/react-stripe-js";
import { useState, useContext } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useCart } from 'react-use-cart';
import '../css/CheckOutForm.css'
import { GetUrl } from "../App";

export default function CheckOutForm({ panier }) {
  const stripe = useStripe();
  const myUrl = useContext(GetUrl);
  const elements = useElements();
  const { cartTotal, emptyCart } = useCart();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  function formatNumber(number) {
    return number.toLocaleString('fr-BE', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  const handleSubmit = async (e) => {
    // ... (le reste de la logique de handleSubmit)
  };
  const handleContextMenu = (e) => {
    e.preventDefault();
  };


  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className="cart-details">
        <h2 className="title-cart">Détails du Panier</h2>
        <ul className="bloc-details-panier">
          <table>
            <thead>
              <tr>
                <th>Produit</th>
                <th>Image</th>
                <th>Quantité</th>
                <th>Prix unitaire</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {panier.map((item, key) => (
                <tr key={key}>
                  <td>{item.title}</td>
                  <td>
                    <img onContextMenu={handleContextMenu} className="img-panier" src={`${myUrl}/public/images/${item.image}`} alt={item.title} />
                  </td>
                  <td>X {item.quantity}</td>
                  <td>{item.price} €</td>
                  <td>{item.itemTotal} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ul>
        <div className="total">Total: {formatNumber(cartTotal)} €</div>
      </div>
      <div className="bloc-droit">
        <PaymentElement id="payment-element" />
        <button disabled={isProcessing || !stripe || !elements} id="submit">
          <span id="button-text">
            {isProcessing ? "Processing ... " : "Payer maintenant"}
          </span>
        </button>
        {message && <div id="payment-message">{message}</div>}
      </div>
    </form>
  );
}
