import Axios from "axios";
import React, {useEffect, useState} from "react";
import ProfileEditForm from "./ProfileEditForm";

import "./User.css";

export default function Profile(props) {

  const [isEdit, setIsEdit] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [showEditProfileForm, setShowEditProfileForm] = useState(false);

  const handleShowEditProfileForm = (boolean) => {
    setShowEditProfileForm(boolean)
  }
 
  const editView = (id) => {
    Axios.get(`/auth/update?id=${id}`)
    .then( response => {
      let user = response.data.user;
      setIsEdit(true);
      setCurrentUser(user)

    })
    .catch(error => {
      console.log(error)
    })
  }

  const editUser = (user) => {
    Axios.put("/auth/update", user)
    .then( response => {
      console.log(user)
      console.log(response)
      props.loadDashboard();

    })
    .catch(error => {
      console.log(error)
    })
  }


  return (
    <div>
      <div className="row container">
        <div className="col-md-4 col-sm-12">
          <h1 className="user-name">Hi, {props.user.firstName}</h1>
          <p>Here is your Dashboard!</p>
          <p>
            You are signed in as a{" "}
            <strong className="user-role">{props.user.userRole}</strong>
          </p>
        </div>
        <div className="col-md-8 col-sm-12 profile-dashboard">
          <div className="row">
            <div className="col-md-9 col-sm-12">
              <br />
              <p>
                Name: {props.user.firstName} {props.user.lastName}
              </p>
              <p>Email: {props.user.emailAddress}</p>
              <p>Member since: {props.user.createdAt}</p> <br />
              <p>
                <a className="change-password-button" href="/">
                  Change your password
                </a>
              </p>
              <div>
              
                <button
                  className="change-password-button edit-btn"
                  onClick={() => {
                    editView(props._id);
                    setShowEditProfileForm(true)
                  }}
                >
                  Edit Profile
                </button>
                {showEditProfileForm ? (
                  <div>
                   <ProfileEditForm
                  key={props.user._id}
                  user={props.user}
                  editUser={editUser}
                  handleShowEditProfileForm={handleShowEditProfileForm}
                ></ProfileEditForm>
                  </div>
                ): (
                  <div></div>
                )}
              </div>
            </div>
            <div className="col-md-3 col-sm-12">
              <img
                alt="profile"
                className="profile-picture"
                src={`${props.user.cloudinary_url}`}
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
