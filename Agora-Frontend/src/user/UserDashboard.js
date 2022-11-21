import React, { useEffect, useState } from "react";
import Axios from "axios";
import BuyerAccount from "./BuyerAccount";
import SellerAccount from "../seller/SellerAccount";
import "./User.css";
export default function UserDashboard(props) {
  // const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [seller, setSeller] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  // useEffect() - ComponentDidMount
  // React Hooks - Allows to hook the functionality into React
  useEffect(() => {
    // Axios function
    loadDashboard(props.user.id);
  }, []);
  console.log(props);
  const loadDashboard = (id) => {
    Axios.get(`/user/dashboard/?userId=${id}`)
      .then(({ data }) => {
        setCurrentUser(data.user);
        setSeller(data.seller);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(props.user);
  return (
    <div>
      {props.user.userRole === "buyer" ? (
        <BuyerAccount
          user={props.user}
          product={props}
          loadDashboard={loadDashboard}
        />
      ) : (
        <SellerAccount
          handleFileInputChange={props.handleFileInputChange}
          previewSourceProduct={props.previewSourceProduct}
          seller={seller}
          user={currentUser}
          products={props.products}
          handleProductFileInputChange={props.handleProductFileInputChange}
          previewProductFile={props.previewProductFile}
          handleSubmitFileProduct={props.handleSubmitFileProduct}
          loadProductList={props.loadProductList}
          loadDashboard={loadDashboard}
        />
      )}
    </div>
  );
}
