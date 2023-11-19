import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useCart } from 'react-use-cart';
import '../css/CheckOutForm.css'

export default function CheckOutForm({ panier }) {
  const stripe = useStripe();
  const elements = useElements();
  const { cartTotal,emptyCart} = useCart();
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
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        
        return_url: `${window.location.origin}/success-paiement`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }
    emptyCart();
    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className="cart-details">
        <h2 className="title-cart">Détails du Panier</h2>
        <ul className="bloc-gauche">
          {panier.map((item, key) => (
            <>

              <li key={key} className="largeur-ligne">
                {item.name} - [{item.quantity}] * {item.price} = {item.itemTotal} €
              </li>
              
            </>
          ))}
          <div className="total">Total: {formatNumber(cartTotal)} €</div>
        </ul>
      </div>
      <div className="bloc-droit">
        <PaymentElement id="payment-element" />
        <button disabled={isProcessing || !stripe || !elements} id="submit">
          <span id="button-text">
            {isProcessing ? "Processing ... " : "Payer maintenant"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </div>
    </form>
  );
}