import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import "../App.css";

export const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleParentShowCheckout = () => {
    setPaymentSuccess(true);
    props.setShowCheckout(false);
    props.setCounter(0);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
      try {
        console.log("user id is " + props.user.id);
        const { id } = paymentMethod;
        const response = await axios.post(
          `/stripe/charge?userId=${props.user.id}`,
          {
            amount: props.total,
            id: id,
            userId: props.user.id,
          }
        );
        console.log("Stripe 35 | data", response.data);
        console.log("Stripe 35 | data", response.data.success);
        if (response.data.success) {
          console.log("CheckoutForm.js 25 | payment successful!");
        }
      } catch (error) {
        console.log("CheckoutForm.js 28 | ", error);
      }
    } else {
      console.log(error.message);
    }
    handleParentShowCheckout();
  };

  return (
    <div className="container  stripe">
      {paymentSuccess === false ? (
        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: 400 }}
          class="stripe-container"
        >
          <h4>Card Details</h4>
          <div class="card stripe-card">
            <CardElement />
          </div>
          <h6>
            Your card will be charged <b>£{props.total}</b>
          </h6>
          <button class="buy-btn stripe-btn">Pay now with Stripe</button>
        </form>
      ) : (
        <div className="container stripe">
          <h3>
            Thank you for your payment!{" "}
            <em>
              <small>
                Please check your emails for a confirmation of your order.
              </small>
            </em>
          </h3>
        </div>
      )}
    </div>
  );
};
