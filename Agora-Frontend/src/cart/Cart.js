import React, { useEffect, useState } from "react";
import Axios from "axios";
import CartItem from "../cart/CartItem";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "../stripe/CheckoutForm";
import { Form, Button } from "react-bootstrap";
import "../App.css";

const PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(PUBLIC_KEY);

export default function Cart(props) {
  const [newShippingBilling, setNewShippingBilling] = useState({});
  const [showSection1, setShowSection1] = useState(false);
  const [showButton1, setShowButton1] = useState(true);
  const [showSection2, setShowSection2] = useState(false);
  const [showButton2, setShowButton2] = useState(true);
  const [cart, setCart] = useState([]);

  const [showCheckout, setShowCheckout] = useState(true);

  const handleSetShowCheckout = (bool) => {
    setShowCheckout(bool);
  };

  useEffect(() => {
    loadCartList(props.user.id);
  }, []);

  const loadCartList = (id) => {
    Axios.get(`/cart?userId=${id}`)
      .then(({ data }) => {
        setCart(data.cart);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const shippingAndBilling = (data, id) => {
    Axios.post(`/shipping_billing/update?userId=${id}`, data)
      .then((response) => {
        console.log("response is " + response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    const attributeToChange = event.target.name;
    const newValue = event.target.value;
    const shippingBilling = { ...newShippingBilling };
    shippingBilling[attributeToChange] = newValue;
    setNewShippingBilling(shippingBilling);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitting");
    shippingAndBilling(newShippingBilling, props.user.id);
    event.target.reset();
  };

  const handleDeleteItem = (id, productId) => {
    console.log(productId);
    deleteItem(id, productId);
  };

  const deleteItem = (id, productId) => {
    Axios.delete(`/cart?userId=${id}&productId=${productId}`)
      .then((response) => {
        console.log(response);
        loadCartList(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h1>My Cart</h1>
      <br />
      {showCheckout ? (
        <div>
          {parseInt(cart.total) > 0 ? (
            <div>
              {cart.products?.map((item, index) => (
                <div key={index}>
                  {
                    <CartItem
                      {...item}
                      loadCartList={loadCartList}
                      id={cart.products[index].productId._id}
                      userId={props.user.id}
                      handleDeleteItem={handleDeleteItem}
                      counterDown={props.counterDown}
                    />
                  }
                </div>
              ))}
              <br />
              <div>
                Cart Total: <b>£{cart.total}</b>
              </div>
              <br />
              {showButton1 ? (
                <Button
                  value="showSB"
                  onClick={() => {
                    setShowSection1(true);
                    setShowButton1(false);
                  }}
                >
                  Continue with Checkout
                </Button>
              ) : null}

              {showSection1 ? (
                <div className="container">
                  <br />
                  <h4>Shipping Address</h4>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group>
                      <Form.Label>Address Line 1</Form.Label>
                      <Form.Control
                        name="addressLine1S"
                        type="text"
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Address Line 2</Form.Label>
                      <Form.Control
                        name="addressLine2S"
                        type="text"
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        name="cityS"
                        type="text"
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>County</Form.Label>
                      <Form.Control
                        name="countyS"
                        type="text"
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>PostCode</Form.Label>
                      <Form.Control
                        name="postCodeS"
                        type="text"
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>

                    <h4>Billing Address</h4>
                    <Form.Group>
                      <Form.Label>Address Line 1</Form.Label>
                      <Form.Control
                        name="addressLine1B"
                        type="text"
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Address Line 2</Form.Label>
                      <Form.Control
                        name="addressLine2B"
                        type="text"
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        name="cityB"
                        type="text"
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>County</Form.Label>
                      <Form.Control
                        name="countyB"
                        type="text"
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>PostCode</Form.Label>
                      <Form.Control
                        name="postCodeB"
                        type="text"
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                    {showButton2 ? (
                      <Button
                        value="show checkout"
                        type="submit"
                        onClick={() => {
                          setShowSection2(true);
                          setShowButton2(false);
                        }}
                      >
                        Confirm and Go to Payment
                      </Button>
                    ) : null}
                  </Form>
                </div>
              ) : null}
              <br />
            </div>
          ) : null}
        </div>
      ) : (
        <h4>You have no items in your cart.</h4>
      )}
      {showSection2 ? (
        <Elements stripe={stripePromise}>
          <CheckoutForm
            total={cart.total}
            user={props.user}
            setShowCheckout={setShowCheckout}
            handleSetShowCheckout={handleSetShowCheckout}
            setCounter={props.setCounter}
          />
        </Elements>
      ) : null}
    </div>
  );
}
