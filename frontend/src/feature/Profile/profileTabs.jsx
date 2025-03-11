import React from "react";
import PersonalInfo from "./PersonalInfo";
import CompanyInfo from "./CompanyInfo";
import PasswordReset from "./PasswordReset";
import "./Styles/ProfileBody.css";

const ProfileTabs = ({ activeTab, setActiveTab, contact }) => {
  function renderContent() {
    switch (activeTab) {
      case "Personal Information":
        return <PersonalInfo contact={contact} />;
      case "Company Infromation":
        return <CompanyInfo contact={contact} />;
      case "Password Reset":
        return <PasswordReset contact={contact} />;
      default:
        return <PersonalInfo contact={contact} />;
    }
  }

  return (
    <div className="profile-tabs">
      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${
            activeTab === "Personal Information" ? "active" : ""
          }`}
          onClick={() => setActiveTab("Personal Information")}
        >
          Personal Information
        </button>
        <button
          className={`tab ${
            activeTab === "Company Infromation" ? "active" : ""
          }`}
          onClick={() => setActiveTab("Company Infromation")}
        >
          Company Information
        </button>
        <button
          className={`tab ${activeTab === "Password Reset" ? "active" : ""}`}
          onClick={() => setActiveTab("Password Reset")}
        >
          Password Reset
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">{renderContent()}</div>
    </div>
  );
};
export default ProfileTabs;
