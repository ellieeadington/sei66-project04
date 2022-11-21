import React, {useState} from 'react'

export default function ProfileEditForm(props) {
  const [newUser, setNewUser] = useState(props.user);
    const [showEditProfileForm, setShowEditProfileForm] = useState(true);
  // Function
  const handleChange = (event) => {
    const attributeToChange = event.target.name;
    const newValue = event.target.value;

    // Creating a copy of new user state
    const user = { ...newUser };
    user[attributeToChange] = newValue;
    console.log(user);
    setNewUser(user);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.editUser(newUser);
    event.target.reset();
    props.handleShowEditProfileForm(false);
  };

  return (
    <div>
      {" "}
      <br />
      <br />
      <br />
      <br />
      <h2>Update your details</h2>
      <form onSubmit= {handleSubmit}
      
     >
        <div>
          <input
            className="add-product-field full-width"
            name="firstName"
            type="text"
            onChange={handleChange}
            value={newUser.firstName}
          ></input>
        </div>
        <div>
          <input
            className="add-product-field full-width"
            name="lastName"
            type="text"
            onChange={handleChange}
            value={newUser.lastName}
          ></input>
        </div>
        <div>
          <input
            className="add-product-field full-width"
            name="emailAddress"
            type="text"
            onChange={handleChange}
            value={newUser.emailAddress}
          ></input>
        </div>
        <div>
          <input className="sign-button" type="submit" value="Update User" />
        </div>
      </form>
    </div>
  );
}
