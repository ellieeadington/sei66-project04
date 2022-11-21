import React from "react";
import Categories from "../components/Categories";
import Search from "../components/Search";
import Review from "../seller/Review";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

export default function Product(props) {
  const { productId } = useParams();
  const thisProduct = props.product.find(
    (product) => product._id === productId
  );
  const [isOpen, setIsOpen] = React.useState(false);
  const [title, setTitle] = React.useState("Transitioning...");

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
    setTitle("Transitioning...");
  };

  const modalLoaded = () => {
    setTitle("Product added to your cart!");
  };

  return (
    <div className="container">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Search></Search>

      <div className="row d-flex mt-6 product-details-div">
        <p className="subcategories">{thisProduct.subCategory}</p>
        <div className="col-md-6">
          <img
            src={`${thisProduct.cloudinary_url}`}
            alt={`${thisProduct.cloudinary_url}`}
            className="product-image-detail"
          />
        </div>
        <div className="col-md-6">
          <h1>{thisProduct.title}</h1>
          <h4> {thisProduct.subTitle} </h4> <br />
          <br />
          <p>
            Condition:{" "}
            <span>
              <strong>{thisProduct.condition}</strong>
            </span>
          </p>
          <div className="row">
            <div className="col-4">
              <p>
                Sold by:{" "}
                <span>
                  <strong>{thisProduct.seller[0].sellerName}</strong>
                </span>
              </p>
            </div>
            
          </div>
          <br />
          <p>
            Shipping fee to the UK:{" "}
            <span>
              {" "}
              <strong>£{thisProduct.shippingRate}</strong>{" "}
            </span>
          </p>{" "}
          <br />
          <h2>
            <span>Price: </span>£{thisProduct.price}
          </h2>{" "}
          <br />
          {thisProduct.isSold === false ? (
            <button
              className="buy-btn"
              onClick={() => {
                props.buyItem(props.user.id, thisProduct._id);
                props.counterUp();
                showModal();
              }}
            >
              Buy
            </button>
          ) : (
            <button className="buy-btn sold-btn">Product Unavailable</button>
          )}
          <Modal
            as="section"
            show={isOpen}
            onHide={hideModal}
            onEntered={modalLoaded}
          >
            <Modal.Header>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>What would you like to do next?</Modal.Body>
            <Modal.Footer>
              <button className="buy-btn" onClick={hideModal}>
                Continue Shopping
              </button>
              <Link to="/cart">
                <button className="buy-btn">Go to Cart</button>
              </Link>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <div className="mt-5 mb-5">
        <h2>Product Description</h2>
        <p className="product-description">{thisProduct.description}</p> <br />
        <h2>Returns Policy</h2>
        <p>{thisProduct.returnsPolicy}</p>
      </div>
      <Review></Review>
      <div>
        <h5>Recently viewed cards - possibly</h5>
      </div>
      <div className="categories-single-product">
        <Categories category={props.category}></Categories>
      </div>
    </div>
  );
}
