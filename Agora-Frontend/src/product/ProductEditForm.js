import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function ProductEditForm(props) {
  const [newProduct, setNewProduct] = useState(props.product);

  const thisSellerId = props.seller._id;

  const handleChange = (event) => {
    const attributeToChange = event.target.name;
    const newValue = event.target.value;

    const product = { ...newProduct };
    product[attributeToChange] = newValue;
    setNewProduct(product);
  };

  function updatePage() {
    props.handleShowEditProductForm(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.editProduct(newProduct, thisSellerId);
    event.target.reset();
    updatePage();
  };

  return (
    <div className="container">
      <h1>Edit Product</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            type="text"
            onChange={handleChange}
            value={newProduct.title}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Subtitle</Form.Label>
          <Form.Control
            name="subTitle"
            type="text"
            onChange={handleChange}
            value={newProduct.subTitle}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            type="text"
            onChange={handleChange}
            value={newProduct.description}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Condition</Form.Label>
          <Form.Control
            name="condition"
            type="text"
            onChange={handleChange}
            value={newProduct.condition}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            type="number"
            onChange={handleChange}
            value={newProduct.price}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="category"
            type="text"
            onChange={handleChange}
            value={newProduct.category}
            defaultValue="default"
          >
            <option value="default" disabled>
              Categories
            </option>
            <option value="Fashion">Fashion</option>
            <option value="Electronics">Electronics</option>
            <option value="Sports, Hobbies, Leisure">
              Sports, Hobbies, Leisure
            </option>
            <option value="Home and Garden">Home and Garden</option>
            <option value="Motors">Motors</option>
            <option value="Media">Media</option>
            <option value="Office Supplies">Office Supplies</option>
            <option value="Health and Beauty">Health and Beauty</option>
            <option value="Collectables and Art">Collectables and Art</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Subcategory</Form.Label>
          <Form.Select
            name="subCategory"
            type="text"
            onChange={handleChange}
            defaultValue="default"
            value={newProduct.subCategory}
          >
            <option value="default" disabled>
              Sub-Categories
            </option>
            <option value="Fashion">Fashion</option>
            <option value="Electronics">Electronics</option>
            <option value="Sports, Hobbies, Leisure">
              Sports, Hobbies, Leisure
            </option>
            <option value="Home and Garden">Home and Garden</option>
            <option value="Motors">Motors</option>
            <option value="Media">Media</option>
            <option value="Office Supplies">Office Supplies</option>
            <option value="Health and Beauty">Health and Beauty</option>
            <option value="Collectables and Art">Collectables and Art</option>
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label>Shipping Rate</Form.Label>
          <Form.Control
            name="shippingRate"
            type="number"
            onChange={handleChange}
            value={newProduct.shippingRate}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Returns</Form.Label>
          <Form.Control
            name="returnsPolicy"
            type="text"
            onChange={handleChange}
            value={newProduct.returnsPolicy}
          ></Form.Control>
        </Form.Group>

        <Button variant="primary" value="Update Product" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
