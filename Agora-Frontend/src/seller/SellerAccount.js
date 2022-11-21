import React, { useEffect, useState } from "react";
import Axios from "axios";
import Product from "../product/Product";
import Profile from "../user/Profile";
import MyProducts from "./MyProducts";

export default function SellerAccount(props) {
  const [products, setProducts] = useState([]);

  const [isEdit, setIsEdit] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});

  console.log(props.user);

  const addProduct = (product, id) => {
    Axios.post(`/product/add?id=${id}`, product)
      .then((response) => {
        console.log("Product added successfully from seller account");
        props.handleSubmitFileProduct(response.data.product._id);
        props.loadProductList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const allProducts = products.map((product, index) => (
    <div key={index}>
      <Product {...product} />
    </div>
  ));

  return (
    <div className="container">
      <Profile user={props.user} loadDashboard={props.loadDashboard} />
      <MyProducts
        handleProductFileInputChange={props.handleProductFileInputChange}
        previewSourceProduct={props.previewSourceProduct}
        previewProductFile={props.previewProductFile}
        handleSubmitFileProduct={props.handleSubmitFileProduct}
        seller={props.seller}
        user={props.user}
        products={props.products}
        addProduct={addProduct}
        loadProductList={props.loadProductList}
      ></MyProducts>
    </div>
  );
}
