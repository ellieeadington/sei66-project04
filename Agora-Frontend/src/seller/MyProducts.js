import React, { useState } from "react";
import ProductCreateForm from "../product/ProductCreateForm";
import "../App.css";
import MyProductList from "./MyProductList";

export default function MyProducts(props) {
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  console.log(props.seller._id)
  const myProducts = props.products
    .filter((product) => {
      if (product.seller.length) {
        const { seller } = product;
        const [sellerInfo] = seller;
        const productSellerId = sellerInfo._id;

        return productSellerId === props.seller._id;
      }
    })
    .map((product) => {
      return (
        <MyProductList
          key={product._id}
          {...product}
          loadProductList={props.loadProductList}
        />
      );
    });

  const handleShowAddProductForm = (boolean) => {
    setShowAddProductForm(boolean);
  };

  return (
    <div>
      <button
        className="index-price-button add-product"
        onClick={() => {
          setShowAddProductForm(true);
        }}
      >
        Add a Product!
      </button>

      {showAddProductForm ? (
        <div>
          <ProductCreateForm
            functions={props}
            seller={props.seller}
            user={props.user}
            handleProductFileInputChange={props.handleProductFileInputChange}
            previewSourceProduct={props.previewSourceProduct}
            previewProductFile={props.previewProductFile}
            handleSubmitFileProduct={props.handleSubmitFileProduct}
            loadProductList={props.loadProductList}
          />
        </div>
      ) : (
        <div> </div>
      )}
      <div>
        <div className="row card-group mt-1 mb-3">
          <h3>My Listings</h3>
          <br></br>
          <br></br>
          {!!myProducts.length ? myProducts : <p>No listings yet!</p>}
        </div>
      </div>
    </div>
  );
}
