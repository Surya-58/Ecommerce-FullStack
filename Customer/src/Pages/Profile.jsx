import React from "react";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

const Profile = () => {
  const { currentUser } = useContext(UserContext);

  if(!currentUser){
    return <h2>Please Login First</h2>
  }
  return <div>
    <h1>My Profile</h1>

    <h3>Name : {currentUser.name}</h3>

    <h3>Email : {currentUser.email}</h3>

    <h3>Phone : {currentUser.phone}</h3>

    <h3>Role : {currentUser.role}</h3>
  </div>;
};

export default Profile;
