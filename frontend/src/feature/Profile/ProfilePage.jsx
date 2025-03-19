import React, { useState } from "react";
import Navbar from "../Navbar-Inventory/Navbar";
import ProfileTabs from "./ProfileTabs";
import "./Styles/ProfileBody.css";
import { useNavigate } from "react-router-dom";

const ProfilePage = (contact) => {
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
      </div>
    </>
  );
};

export default ProfilePage;
