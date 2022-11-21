import "./Auth.css";
import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Signin(props) {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({});

  const changeHandler = (e) => {
    const user = { ...newUser };
    user[e.target.name] = e.target.value;

    setNewUser(user);
  };

  const loginHandler = () => {
    props.login(newUser);
    navigate("/");
  };
  return (
    <div className="container div-for-sign">
      <div className="row sign">
        <div className="col-md-6 signin-left">
          <h1 className="sign-title">Sign in</h1> <br />
          <br />
          <form onSubmit={loginHandler}>
            <Form.Group>
              <Form.Control
                name="emailAddress"
                placeholder="Email"
                onChange={changeHandler}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                name="password"
                placeholder="Password"
                type="password"
                onChange={changeHandler}
              ></Form.Control>
              <p>Forgot your password?</p>
            </Form.Group>
            <div className="button-div">
              <Button className="sign-button" type="submit">
                Log in
              </Button>
            </div>
          </form>
        </div>
        <div className="col-md-6 signin-right">
          <h1 className="signup-signin-title">New to Agora?</h1> <br />
          <p className="sign-up-white">
            Enter your personal details and get started with us!
          </p>{" "}
          <br />
          <br />
          <div className="button-div">
            <button className="signin-register">
              <Link to="/signup"> Register</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
