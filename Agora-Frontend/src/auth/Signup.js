import React, { useState } from "react";
import "./Auth.css";

import { Link, useNavigate } from "react-router-dom";

export default function Signup(props) {
  const navigate = useNavigate();

  const [showBuyer, setShowBuyer] = useState(false);

  const [showSeller, setShowSeller] = useState(false);

  const [newUser, setNewUser] = useState({});

  const changeHandler = (e) => {
    const user = { ...newUser };
    user[e.target.name] = e.target.value;

    setNewUser(user);
  };

  const registerHandler = async () => {
    await props.register(newUser);
    navigate("/signin");
  };

  const handleFileInputChange = (e) => {
    props.handleFileInputChange(e);
  };

  return (
    <div className="signupForm container">
      <h1 className="sign-title">Sign Up</h1>
      <h3 className="sign-up-text">How would you like to sign up today?</h3>
      <br></br>
      <div className="button-div div-spaced">
        <div className="form-check form-check-inline groupOne">
          <a href="#buyer-link">
            <button
              onClick={() => {
                setShowBuyer(true);
                setShowSeller(false);
              }}
              className="sign-button"
              htmlFor="inlineCheckbox1"
              name="userRole"
              defaultValue="buyer"
            >
              Buyer
            </button>
          </a>
          &nbsp; &nbsp;
        </div>
        <div className="form-check form-check-inline groupOne">
          <a href="#seller-link">
            <button
              onClick={() => {
                setShowSeller(true);
                setShowBuyer(false);
              }}
              className="sign-button"
              htmlFor="inlineCheckbox2"
              name="userRole"
              defaultValue="seller"
            >
              Seller
            </button>
          </a>
          &nbsp; &nbsp;
        </div>
      </div>{" "}
      <br />
      <br />
      <br />
      {showBuyer ? (
        <div id="buyer-link">
          <form encType="multipart/form-data">
            <div>
              <h3>Let's get you signed up so you can start shopping!</h3>
              <br />
              <div className="groupOne group1">
                <input type="hidden" value="buyer" name="userRole"></input>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstNameInput"
                  name="firstName"
                  placeholder="Enter first name"
                  onChange={changeHandler}
                ></input>
              </div>
              <div className="groupOne group1">
                <input type="hidden" value="seller" name="userRole"></input>
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastNameInput"
                  name="lastName"
                  placeholder="Enter last name"
                  onChange={changeHandler}
                ></input>
              </div>
              <div className="groupOne group1">
                <label>Upload a profile photo</label>&nbsp;<br></br>
                <input
                  name="cloudinary_url"
                  type="file"
                  onChange={handleFileInputChange}
                ></input>
              </div>
              <div>
                {props.previewSource && (
                  <img
                    src={props.previewSource}
                    alt="chosen"
                    style={{ height: "150px" }}
                  />
                )}
              </div>
              <div className="grouppOne group1">
                <label htmlFor="emailAddress">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  name="emailAddress"
                  id="emailAddressInput"
                  placeholder="Enter email"
                  onChange={changeHandler}
                ></input>
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  className="form-control"
                  name="password"
                  type="password"
                  id="passwordInput"
                  placeholder="Password must be more than 6 characters"
                  onChange={changeHandler}
                ></input>
              </div>
              <div>
                <label htmlFor="userRole">
                  You must accept our Terms and Conditions{" "}
                </label>
                <input
                  name="userRole"
                  type="radio"
                  id="userRole"
                  value="buyer"
                  className="radio-button-signup"
                  onChange={changeHandler}
                ></input>
              </div>
              <button
                className="sign-button"
                type="button"
                onClick={registerHandler}
              >
                Sign up
              </button>
              <br />
              <br />
              <h2>
                Already have an account?<Link to="/signin"> Sign in here</Link>
              </h2>{" "}
              <br />
              <br />
              <br />
              <br />
            </div>
          </form>
        </div>
      ) : showSeller ? (
        <form>
          <div id="seller-link">
            <h3>Let's get you signed up so you can start selling!</h3>
            <div className="groupOne group1">
              <label htmlFor="firstName">Name</label>
              <input
                type="text"
                className="form-control"
                id="firstNameInput"
                name="firstName"
                placeholder="Enter first name"
                onChange={changeHandler}
              ></input>
            </div>
            <div className="groupOne group1">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastNameInput"
                name="lastName"
                placeholder="Enter last name"
                onChange={changeHandler}
              ></input>
            </div>
            <div className="groupOne group1">
              <label>Upload a profile photo</label>&nbsp;<br></br>
              <input
                name="cloudinary_url"
                type="file"
                onChange={handleFileInputChange}
              ></input>
            </div>
            <div>
              {props.previewSource && (
                <img
                  src={props.previewSource}
                  alt="chosen"
                  style={{ height: "150px" }}
                />
              )}
            </div>
            <div className="groupTwo">
              <label htmlFor="sellerName">Seller Name</label>
              <input
                type="text"
                className="form-control"
                id="sellerNameInput"
                name="sellerName"
                placeholder="Enter seller name"
                onChange={changeHandler}
              ></input>
            </div>
            <div className="groupTwo">
              <label>Add a bio to your shop page</label>
              <textarea
                className="form-control"
                rows="3"
                name="bio"
                placeholder="Max 500 characters"
                onChange={changeHandler}
              ></textarea>
            </div>
            <div className="grouppOne group1">
              <label htmlFor="emailAddress">Email Address</label>
              <input
                type="email"
                className="form-control"
                name="emailAddress"
                id="emailAddressInput"
                placeholder="Enter email"
                onChange={changeHandler}
              ></input>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                name="password"
                type="password"
                id="passwordInput"
                placeholder="Password must be more than 6 characters"
                onChange={changeHandler}
              ></input>
            </div>
            <div>
              <label htmlFor="userRole">
                You must accept our Terms and Conditions{" "}
              </label>
              <input
                name="userRole"
                type="radio"
                id="userRole"
                value="seller"
                className="radio-button-signup"
                onChange={changeHandler}
              ></input>
            </div>
            <button
              className="sign-button"
              value="submit"
              onClick={registerHandler}
            >
              Sign up
            </button>
            <br />
            <br />
            <h2>
              Already have an account?<Link to="/signin"> Sign in here</Link>
            </h2>
            <br />
            <br />
            <br />
            <br />
          </div>
        </form>
      ) : (
        <div></div>
      )}
    </div>
  );
}
