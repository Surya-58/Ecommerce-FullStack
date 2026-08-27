import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import "../Styles/Pages/profile.css";

const Profile = () => {
  const { currentUser, logout } = useContext(UserContext);

  if (!currentUser) {
    return (
      <div className="container">
        <h2>Please Login First</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="profile-page">
        <div className="profile-sidebar">
          <div className="profile-sidebar__header">
            <img
              className="profile-sidebar__avatar"
              src="https://api.dicebear.com/7.x/initials/svg?seed=${currentUser.name}"
              alt={currentUser.name}
            />
            <p className="profile-sidebar__name">{currentUser.name}</p>
            <p className="profile-sidebar__email">{currentUser.email}</p>
          </div>

          <nav className="profile-nav">
            <div className="profile-nav__item profile-nav__item--active">
              Personal Info
            </div>
            <div className="profile-nav__item profile-nav__item--danger" onClick={logout}>
              Logout
            </div>
          </nav>
        </div>

        <div className="profile-panel">
          <h2 className="profile-panel__title">Personal Info</h2>

          <div className="profile-form">
            <div className="field">
              <label className="field__label">Full Name</label>
              <input className="input" value={currentUser.name} disabled />
            </div>

            <div className="field">
              <label className="field__label">Email Address</label>
              <input className="input" value={currentUser.email} disabled />
            </div>

            <div className="field">
              <label className="field__label">Phone Number</label>
              <input className="input" value={currentUser.phone} disabled />
            </div>

            <div className="field">
              <label className="field__label">Account Type</label>
              <input className="input" value={currentUser.role} disabled />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;