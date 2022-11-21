# SEI Project-4

## Goal

>To develop a full-stack, single-page MERN-stack application hosted on Heroku.

## Team Members

>- Sasha Ward
>- Milos Jocic
>- Claudia Bowen
>- Ellie Eadington

## Timeframe

>10 days

## Technologies Used

>- Express
>- Node.js
>- MongoDB + Mongoose
>- Bcrypt
>- Passport
>- Stripe
>- Cloudinary
>- Body-parser
>- React.js
>- Axios
>- Jsonwebtoken
>- React-router-dom
>- Git + Github

## Agora
<img src="Agora-Backend\public\image\animation.gif"/>
>This was my final project for the Software Engineering Immersive course; a full-stack MERN Marketplace application built with a team of 4. Agora is an app where you can buy and sell anything, integrated with Stripe checkout.

Deployed version: https://sei66project4agora.herokuapp.com/

## Getting Started/Code Installation

>- Clone the repo
>- Install dependencies using ‘npm i’ in terminal
>- Start the database using ‘mongod –dpath ~/data/db’
>- cd into the backend and frontend applications, and run using ‘nodemon server.js’ and ‘npm start’, respectively.

## Planning

### Ideation stage

>First, we held a meeting to decide on a project idea. We wanted to ensure that the project would demonstrate the skills we developed during our course in a real-world application. We toyed with the idea of a project management tool, but the time-constraints would have not made this easy. We settled on a marketplace app, as this satisfied all of the requirements we had; a real-world application, CRUD operations, interesting features to work on in both the front and backend, and a chance to broaden our skillset, by using tools such as Cloudinary and Stripe checkout.

### Frontend / backend allocation

>We decided to segment the workload by front-end and back-end; Sasha and I took on the role of backend developers, and Claudia and Milos focussed on front-end. This was an easy and fair way to split the work as it satisfied each of our preferences.

### Feature planning

>Once we had decided on a project idea, we brainstormed the details of the features of the site and the user stories. We separated the features and functionalities into MVP’s and stretch goals.

### ERD

>Sasha and I then created our ERD’s after we determined how we wanted the app to function and which features we wanted to implement.

![image](Agora-Backend\public\image\ERD.PNG)

### Wireframes

>Claudia, who was responsible for the front-end design of the website put together the basic wireframes of the application in Figma, as seen below.
<div style="display: inline-flex">
<img src="Agora-Backend\public\image\home.PNG" height="200"/>
<img src="Agora-Backend\public\image\home.PNG" height="200"/>
<img src="Agora-Backend\public\image\payment.PNG" height="200"/>
<img src="Agora-Backend\public\image\signin.PNG" height="200"/>
<img src="Agora-Backend\public\image\single product.PNG" height="200"/>
<img src="Agora-Backend\public\image\user.PNG" height="200"/>
</div>
### Trello

>Now we had completed our initial planning, we populated our Trello board with general, back-end and front-end to-do cards and used this going forward to keep track of the status of our project.

![image](Agora-Backend\public\image\trello.PNG)

## Build/Code Process

### Set-up

>After the initial set-up of our project folders and repos, we separated into our front-end and back-end teams to get started with the basic build. In the backend, Sasha created our folder and file structures whilst I set up our MongoDB Atlas database connection. We then created and migrated the models together. Claudia and Milos worked on the folder and file structure in the front-end and created the react components required for the site’s basic functionality.

>To ensure that the build was efficient, we all worked on functionalities that made the most logical sense to complete initially. Sasha worked on building the CRUD operations and REST APIs with the product model, so that Claudia and Milos could begin working on the home and product detail pages. I worked on sign-up, sign-in, sign-out and authentication, so that we could start creating and testing our functionalities based on user role and logged in/logged out, which was fundamental to our overall product.

### Sign-Up

>First I created an auth_signup_post request in our auth.js controller and its corresponding route which I imported and mounted in server.js. I used bcrypt to hash the user passwords with 10 rounds of salt. As we had two types of user; the buyer and the seller, I created a new seller object whenever an individual was signing up as a seller, and then pushed the user object id to the referenced user field within the seller object.

``` js
const { User } = require("../models/User");
const { Seller } = require("../models/Seller");
 
const bcrypt = require("bcrypt");
const salt = 10;
 
exports.auth_signup_get = (req, res) => {
  res.render("auth/signup");
};
 
exports.auth_signup_post = async (req, res) => {
  let emailAddress = req.body.emailAddress;
 
  try {
    let match = await User.findOne({ emailAddress });
    if (!match) {
      let hash = bcrypt.hashSync(req.body.password, salt);
 
      let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress,
        password: req.body.password,
        userRole: req.body.userRole,
        cloudinary_url: req.body.data,
      });
      user.password = hash;
 
      user
        .save()
        .then((createdUser) => {
          User.findById(user).then((user) => {
            if (user.userRole === "seller") {
              let seller = new Seller(req.body);
              seller.user.push(user);
              seller.save();
            } else {
              res.json({ message: "no seller" });
            }
          });
          res.json({ message: "User created successfully", user: createdUser });
        })
        .catch((err) => {
          console.log(err);
          res.json({ message: "please try again later" });
        });
    }
    if (match) {
      res.json({ message: "you already have an account, please sign-in" });
    }
  } catch (error) {
    console.log(error);
  }
};
```

>Upon sign-up we required the user to upload a profile picture, so created a file to configure our Cloudinary parameters which would enable the user to upload their image to the cloud. There were difficulties in enabling the user to upload Cloudinary images in the front-end, so this became redundant further down the line.

### Sign-In

>I used json-web-token to enable communication between the client and server side applications for the authentication of user credentials for secure sign-in and ensure that routes that were required to be hidden behind the wall of authentication were done so.

>I created my auth_signin_post API where I took the user’s email address and password from the body of the request and queried the database to find a user with those credentials. I used an if statement within the try statement to return a json response if no user was found. I used bcrypt.compareSync() to check if the password that was entered by the user matches the encrypted password stored in the database and return a json response if there was no match, and create a jwt token if the user is authenticated properly. For the payload, I created an object which stored the user_id and firstName (the latter of which was requested by the front-end team). I then created my jwt signature using the .sign() method where I provided my payload, secret key for authentication and the token expiration time. This token is then returned as a success json response. I then checked that my api worked using Postman using the credentials of the user that I had previously signed up as and making sure that my jwt token was being returned as a json response.

```js
exports.auth_signin_post = async (req, res) => {
  let { emailAddress, password } = req.body;
 
  try {
    let user = await User.findOne({ emailAddress });
 
    if (!user) {
      return res.json({ message: "User not found" }).status(400);
    }
 
    const isMatch = await bcrypt.compareSync(password, user.password);
 
    if (!isMatch) {
      return res.json({ message: "Password not matched" }).status(400);
    }
 
    const payload = {
      user: {
        id: user._id,
        name: user.firstName,
      },
    };
    jwt.sign(
      payload,
      process.env.SECRET,
      { expiresIn: 3600000000000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token }).status(200);
      }
    );
  } catch (error) {
    console.log(error);
    res.json({ message: "You are not logged in" }).status(400);
  }
};
```

>Next I wrote my isLoggedIn middleware to hide routes behind the wall of authentication. First I assigned my token variable an empty string, and my authorizationToken variable the authorization header within the nested object in the request. If the token exists, I replace the keyword ‘Bearer ‘ which is automatically prepended to the token with an empty string and assign it back to my variable. I then assigned this to my token variable. If there is no token, I returned a json response stating so, else, I assigned my decodedToken constant with the jwt.verify method accepting the token and secret key as parameters, and used this to assign the associated user to the req.user, to be shared with all other pages. I used next(); to then continue to execute the API in the respective route that my middleware was applied to. I tested this in Postman by using the Authorization tool with the bearer token.

```js
const jwt = require('jsonwebtoken');
require("dotenv").config;

module.exports = (req, res, next) => {

    let token = ""
    let authorizationToken = req.header("Authorization");
    console.log(authorizationToken)
   
    if(authorizationToken){
        authorizationToken = authorizationToken.replace("Bearer ", "");
        console.log(authorizationToken);
        token = authorizationToken
    }
 
    if(!token){
        return res.json({"message": "You cannot view this as it is hidden behind the wall of authentication."})
    }
 
    try{
        const decodedToken = jwt.verify(token, process.env.SECRET);
        req.user = decodedToken.user;
        next();
    }
    catch(error){
        return res.json({"message": "Your token is invalid."})
    }
}

```

>I also then created the auth_logout_get, auth_update_put APIs as well as the update_password_put API, using bcrypt.compare() method accepting the old password from the user request with the encrypted password in the database, and updating the password with a newly hashed password using the bcrypt.hash() method.

### User dashboards

>Next, whilst Sasha began working on the API’s for the user’s shopping cart,  I began working on the user_dashboard_get requests to return a json response which included all of the information associated with the user, including their purchases and reviewed products. Initially, I wrote the user_dashboard_get and seller_dashboard_get as two separate APIs, but then took a more streamlined approach by combining them into one.

``` js
const { User } = require("../models/User");
const { Seller } = require("../models/Seller");
 
exports.user_dashboard_get = async (req, res) => {
  let user = await User.findById(req.query.userId).populate("review");
  let seller = "";
  seller = await Seller.find({ user: { $in: [user._id] } })
    .populate("product", "review")
    .then((seller) => {
      seller = seller[0];
      return seller;
    });
  try {
    res.status(200).json({ user, seller });
  } catch (error) {
    console.log(error);
  }
};
```

### Cart Checkout

>Once Sasha had completed the cart APIs for adding & removing items from the cart and displaying the cart json response, I began creating my Cart.js and CartItem.js components in our React application. I soon noticed that we were not getting the json response for the products referenced within the cart model, and so I went into the getCart API with Sashas approval and populated the nested products within cart using the following code:

```js
  let cart = await Cart.findOne({ userId: userId })
    .populate("products.productId")
    .then((cart) => {
      return cart;
    });
```

>I also wanted the total value of the cart to update when a new item was added, and so I included the following statement:

```js
      let total = 0;
      cart.products.map((product) => {
        total +=
          product.quantity * product.productId.price +
          product.productId.shippingRate;
        return total;
```

>Moving back to the react Cart.js component, I created a RFC with an axios.get request to access the cart and set the cart state variable to the cart json object. I included this Axios function in the useEffect React hook to handle this aside from the other functions in the component and ensure the data was updated when any changes were made. I rendered the cart items by mapping over each product in the cart and passing the required parameters to CartItem components:

```js
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
```

>Next, I moved onto my CartItem.js component where I used React Bootstrap to render each CartItem as desired, including the price, shipping and total price, as well as a button to handle the removal of the item from the cart which was developed by Sasha in the backend and Claudia in the frontend.

```js
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
```

### Shipping & Billing

>In order to allow the user to provide shipping and billing details before making a payment, I created a new post API and corresponding route in the backend, of course testing this API in Postman before moving onto the frontend. I added additional parameters to my findByIdAndUpdate method to ensure that the modified document was returned and validation was supported.

```js
exports.shippingAndBilling = async (req, res) => {
  console.log(req.body.addressLine1S);
  console.log(req.body.addressLine1B);
  let userId = req.query.userId.trim();
  let user = await User.findById(userId);
  try {
    await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          shippingAddress: {
            addressLine1: req.body.addressLine1S,
            addressLine2: req.body.addressLine2S,
            city: req.body.cityS,
            county: req.body.countyS,
            postCode: req.body.postCodeS,
          },
 
          billingAddress: {
            addressLine1: req.body.addressLine1B,
            addressLine2: req.body.addressLine2B,
            city: req.body.cityB,
            county: req.body.countyB,
            postCode: req.body.postCodeB,
          },
        },
      },
      { new: true, runValidators: true},
      function (err, user) {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json({ user });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
```

>In my Cart.js component in React, I used React bootstrap to render forms for the user to add shipping and billing information before moving on to payment, and used handleChange() functions to update the boolean state variables that would trigger the shipping and billing data objects to be updated with the new data that was being inputted by the user, and a handleSubmit() function to trigger the Axios request function upon form submission, and clear the input fields. I created additional functions to show and hide the shipping & billing forms to create a more fluid UX.

### Stripe Transactions

>After some research, I decided that the most simple way to provide the payment functionality was to use the Stripe Checkout payment integration with a free developer account. First, I created my account to access the public and secret keys and configured these environment variables in the .env file in our React application. I used the internet to find documentation on how to implement this functionality in Node.js and React applications to allow me to easily apply the concepts and amend them to suit the requirements of our site. Next, I installed the stripe dependencies, and began setting out the folder and file structure in the React application. Initially, I had two js files for the CheckoutForm and StripeContainer components. Later on, I moved the latter into the CheckoutForm file as I was struggling to pass props up to the parent, but I later realised this was not required, and as it is not best practice, I would refactor this going forward. As I wanted the payment functionality to sit within the Cart element, I rendered the CheckoutForm component here within the Elements component provided by Stripe, all sitting within a conditional section to display the CheckoutForm element when the user clicks the ‘go to payment’ button. The Elements component is required to provide context to access the stripePromise and other methods.

```js
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
```

>For my CheckoutForm component, I imported useStripe and useElements methods and created an async function to handle payments upon form submission using stripes createPaymentMethod. This function was basic at first so that I could test the response using the test card data. Once I was receiving the correct logs in the console including the token id, I then created a post request in server.js in the backend application to receive the token id and enable us to process the payment. Before doing so, I installed the dependencies and added the secret key to the .env file. In my route, I used the stripe.paymentsIntent.create() function, passing the id and cart total as parameters. I then went back to my CheckoutForm component in our React application to send the amount and id as parameters to an axios.post request using the route I created in the backend. In order to easily update the user object to include the transaction, I also passed the user id as a query parameter in my route. In order to hide the checkout once the payment had been successful, I created a function in Cart.js that assigned a showCheckout variable a boolean state of false once the payment had been successful, and passed this state variable down to the CheckoutForm as props, which I then handled in a new function that was triggered in my async function when a paymentSuccess state variable was set to true after the payment had been successful.

```js
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import "../App.css";
 
export const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
 
  const handleParentShowCheckout = () => {
    setPaymentSuccess(true);
    props.setShowCheckout(false);
    props.setCounter(0);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
 
    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
      try {
        console.log("user id is " + props.user.id);
        const { id } = paymentMethod;
        const response = await axios.post(
          `/stripe/charge?userId=${props.user.id}`,
          {
            amount: props.total,
            id: id,
            userId: props.user.id,
          }
        );
        console.log("Stripe 35 | data", response.data);
        console.log("Stripe 35 | data", response.data.success);
        if (response.data.success) {
          console.log("CheckoutForm.js 25 | payment successful!");
        }
      } catch (error) {
        console.log("CheckoutForm.js 28 | ", error);
      }
    } else {
      console.log(error.message);
    }
    handleParentShowCheckout();
  };
 
  return (
    <div className="container  stripe">
      {paymentSuccess === false ? (
        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: 400 }}
          class="stripe-container"
        >
          <h4>Card Details</h4>
          <div class="card stripe-card">
            <CardElement />
          </div>
          <h6>
            Your card will be charged <b>£{props.total}</b>
          </h6>
          <button class="buy-btn stripe-btn">Pay now with Stripe</button>
        </form>
      ) : (
        <div className="container stripe">
          <h3>
            Thank you for your payment!{" "}
            <em>
              <small>
                Please check your emails for a confirmation of your order.
              </small>
            </em>
          </h3>
        </div>
      )}
    </div>
  );
};
```

>Once I was happy with the frontend, I moved back to the route I created in server.js in the backend, and updated the code to enable me to create a new instance of the Transaction model that we had previously defined, which would store information such as the user, payment id, cart and shipping & billing details. I then added an isSold field to the Product Model, so that this could be updated by iterating through each product in the cart and assigning the respective product isSold key a value of true. This then allowed Claudia to be able to prevent users from purchasing a product twice. I then used the mongoose $pull method to remove the sold items from the users cart, which was then rendered in the app.

```js
app.post("/stripe/charge", cors(), async (req, res) => {
  console.log("stripe-routes.js 9 | route reached", req.body);
  let { amount, id } = req.body;
  let userId = req.body.userId;
  let user = await User.findOne({ _id: userId });
  console.log("stripe-routes.js 10 | amount and id", amount, id);
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "GBP",
      description: "Agora",
      payment_method: id,
      confirm: true,
    });
    if (payment) {
      let cart = await Cart.findOne({ userId: userId });
      if (cart) {
        const transaction = new Transaction({
          user: user,
          totalAmount: amount,
          currency: "GBP",
          paymentMethod: id,
          cart: cart,
          billingAddress: user.billingAddress,
        });
        transaction
          .save()
          .then(() => {
            user.transaction.push(transaction.id);
            user
              .save()
              .then(() => {
                cart.products.forEach((item) => {
                  Product.findOne({ _id: item.productId })
                    .then((product) => {
                      product.update({ isSold: true }, function (err, result) {
                        if (err) {
                          console.log(err);
                        } else {
                          console.log("Result :", result);
                        }
                      });
 
                      cart.update(
                        { $pull: { products: item } },
                        { safe: true, multi: true },
                        function (err, result) {
                          if (err) {
                            console.log(err);
                          } else {
                            console.log("Result :", result);
                          }
                        }
                      );
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
 
        console.log("stripe-routes.js 19 | payment", payment);
        return res.status(200).json({ success: true, transaction, cart });
      }
    }
  } catch (error) {
    console.log("stripe-routes.js 17 | error", error);
    res.json({
      message: "Payment Failed",
      success: false,
    });
  }
});
```

## Wins & Challenges

### Wins

>- Team Workflow: The four of us worked incredibly well together, which was made easy by our consistent and strong communication, sharing bugs and problems early on for a second opinion, making regular pull requests, keeping up-to-date with the dev branch and ensuring that our workload was prioritised appropriately to ensure efficiency.
>- Technical growth: I am very proud of how myself and my team took on problems that we had not yet faced and adapted to rise to the challenge. For example, I created full-stack checkout and transaction functionalities, adapted the cart APIs to satisfy new requirements, understood when it was appropriate to modify our models to solve a problem, and worked with the team to help resolve their bugs and problems.

### Challenges

>- Frontend Completion: We were ambitious with our project and the amount of features we wished to include, which meant that at the end of the project, we had some backend APIs written that we did not have time to complete in the frontend. Given the knowledge we acquired during project week, I believe if we were to do the project again, we would have been able to complete all of our desired features.
>- Image Upload: Uploading images to Cloudinary proved to be the most challenging functionality of our project. When I created our user signup APIs, I initially wrote a piece of Multer middleware to store the image files locally, but with issues we encountered displaying these images in our deployed Heroku application, I then switched to implement a Cloudinary upload functionality in the backend. My teammates had difficulty in trying to get this to work on the frontend, but with some support from our instructor, they were able to resolve their issues to ensure the functionality was working.

## Bugs

>Currently, images uploaded during signup and product upload must be under 100kb to display on our app.

## Future Enhancements

>- Favouriting: Allow the user to favourite products of interest and have these items display on their user dashboard, where they then have the option to unfavourite them.
>- Reviews: Enable the user to review a product that they have purchased, and have these reviews display on the user dashboard, as well as on the product detail page, and the seller dashboard.
>- Enhancing the Stripe Checkout: I would love to add more components to the Stripe checkout, such as shipping and billing.
>- Seller Dashboard Analytics: I would like to include an analytics dashboard that displays basic stats such as aggregated sales, gross profit, avg rating.

## Key Takeaways

>- My skills as a software engineer have developed rapidly over the course of this project, and upon its completion I feel ready to rise to any challenge, understanding that by applying prior knowledge and critical thinking skills, I can successfully create something that seemed difficult in the ideation stage.
>- I have learnt how to efficiently deconstruct a problem to find its breaking point & bugs, and combat these issues with a creative solution - consoleLog everything, and do so smartly.
>- Although my focus was on the backend, I was proud of how I adapted to work on the frontend, creating React components for the cart, checkout and transactions to support the frontend team with their workload. This taught me that I was successful in learning to adapt and be agile and support any part of the build process where necessary.
