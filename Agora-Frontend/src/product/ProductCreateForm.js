import React, { useState } from "react";

export default function ProductCreateForm(props) {
  const [newProduct, setNewProduct] = useState({});

  console.log(props);
  const thisSellerId = props.seller._id;

  const handleChange = (event) => {
    const attributeToChange = event.target.name;
    const newValue = event.target.value;
    const product = { ...newProduct };
    product[attributeToChange] = newValue;
    setNewProduct(product);
  };

  function updatePage() {
    props.handleShowAddProductForm(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.functions.addProduct(newProduct, thisSellerId);
    event.target.reset();
    props.handleSubmitFileProduct(props.response.data.user._id);
    props.loadProductList();
    updatePage();
  };

  const handleProductFileInputChange = (e) => {
    props.handleProductFileInputChange(e);
  };

  return (
    <div className="container add-form">
      <h1>Let's sell it!</h1>
      <form encType="multiform/form-data">
        <input
          className="add-product-field full-width"
          name="title"
          type="text"
          onChange={handleChange}
          placeholder="Product name"
        ></input>
        <input
          className="add-product-field full-width"
          name="subTitle"
          type="text"
          onChange={handleChange}
          placeholder="Product Subtitle"
        ></input>
        <input
          className="add-product-field full-width"
          name="description"
          type="textarea"
          onChange={handleChange}
          placeholder="Description"
        ></input>
        <input
          className="add-product-field full-width"
          name="condition"
          type="text"
          onChange={handleChange}
          placeholder="Condition"
        ></input>
        <input
          className="add-product-field full-width"
          name="price"
          type="text"
          onChange={handleChange}
          placeholder="Price in £"
        ></input>
        <div>
          <select
            className="add-product-field full-width"
            name="category"
            onChange={handleChange}
            placeholder="Category"
          >
            <option value="no-category">Category</option>
            <option value="fashion">Fashion</option>
            <option value="electronics">Electronics</option>
            <option value="sports-hobbies-leisures">
              Sports, hobbies, leisures
            </option>
            <option value="home-garden">Home and Garden</option>
            <option value="motors">Motors</option>
            <option value="media">Media</option>
            <option value="office-supplies">Office Supplies</option>
            <option value="health-beauty">Health and Beauty</option>
            <option value="collectables-art">Collectables and Art</option>
          </select>
        </div>{" "}
        <br />
        <div>
          <select
            className="add-product-field full-width"
            type="text"
            name="subCategory"
            onChange={handleChange}
            placeholder="Subcategory"
          >
            <option value="no-category">Sub Category</option>
            <option value="fashion">Fashion</option>
            <option value="electronics">Electronics</option>
            <option value="sports-hobbies-leisures">
              Sports, hobbies, leisures
            </option>
            <option value="home-garden">Home and Garden</option>
            <option value="motors">Motors</option>
            <option value="media">Media</option>
            <option value="office-supplies">Office Supplies</option>
            <option value="health-beauty">Health and Beauty</option>
            <option value="collectables-art">Collectables and Art</option>
          </select>
        </div>{" "}
        <br />
        <input
          className="add-product-field full-width"
          name="shippingRate"
          type="text"
          onChange={handleChange}
          placeholder="Shipping Rate"
        ></input>
        <input
          className="add-product-field full-width"
          name="returnsPolicy"
          type="text"
          onChange={handleChange}
          placeholder="Your returns policy"
        ></input>
        <br />
        <label>Upload a photo of the product</label>&nbsp;<br></br>
        <div>
          <input
            className="add-product-field full-width"
            name="cloudinary_url"
            type="file"
            onChange={handleProductFileInputChange}
          ></input>
        </div>
        <div>
          {props.previewSourceProduct && (
            <img
              src={props.previewSourceProduct}
              alt="chosen"
              style={{ height: "150px" }}
            />
          )}
        </div>
        <button className="sign-button" onClick={handleSubmit}>
          Add product
        </button>{" "}
        <br />
        <br />
        <br />
      </form>
    </div>
  );
}
