import React, { useState } from "react";
import Navbar from "../Navbar-Inventory/Navbar";
import ProfileTabs from "./ProfileTabs";
import "./Styles/ProfileBody.css";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [contact, setContact] = useState({
    firstName: "John",
    lastName: "Wick",
    img: "/Moon River.jpeg",
    emailAddress: "johnwick@wickstation.com",
    phoneNumber: "+91-(009)-0009",
    dateOfBirth: "20/10/2000",
    gender: "Male",
    role: "Admin",
    bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Curabitur sodales sit amet nunc et vehicula. Mauris sed lectus nisi.",
  });

  const [activeTab, setActiveTab] = useState("Personal Information");
  const navigate = useNavigate();
  // Navigation is for when i click on Home whichh is in breadCrumb it will redirect me to inventory page
  const handleInventoryBack = () => {
    navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        <Navbar />
      </nav>

      <div className="profile-body">
        <h2 className="page-title">Account Settings</h2>
        <div className="breadcrumbs">
          <span className="breadcrumbs-1" onClick={handleInventoryBack}>
            Home /
          </span>
          <span className="breadcrumbs-1"> Account Settings </span>
          <span className="breadcrumbs-active"> / {activeTab} </span>
        </div>

        {/* Tabs Component */}
        <ProfileTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          contact={contact}
        />

        {/* Edit Button (Floating at bottom-right) */}
        <div className="edit-btn-container">
          <button className="edit-btn">Edit</button>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
