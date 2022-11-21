import React from "react";
import { Button } from "react-bootstrap";
export default function CartItem(props) {
  console.log(props.userId);
  console.log(props.productId._id);
  console.log(props.id);

  return (
    <>
      <div className="container cart-div">
        <div className="row">
          <div className="col-2">
            <img
              className="cart-product-image"
              src={`${props.productId.cloudinary_url}`}
              alt=""
            />
          </div>
          <div className="col-5">
            <h4>{props.productId.title}</h4>
            <p className="cart-items-text card-text">
              {props.productId.subTitle}
            </p>

            <p className="cart-items-text">Qty: {props.quantity}</p>
            <h5>Price: £{props.productId.price}</h5>
            <h5>Shipping: £{props.productId.shippingRate}</h5>
          </div>
          <div className="col-5">
            <br />
            <h4>
              Total: £
              {parseInt(props.quantity) * parseInt(props.productId.price) +
                parseInt(props.productId.shippingRate)}
            </h4>{" "}
            <br />
            <Button
              className="remove-cart"
              variant="primary"
              value="remove"
              onClick={() => {
                props.handleDeleteItem(props.userId, props.id);
                props.counterDown();
              }}
            >
              Delete
            </Button>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
}
