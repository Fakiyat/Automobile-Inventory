import React from "react";
import "./Styles/ProfileBody.css";

const CompanyInfo = ({ contact }) => {
  return (
    <div className="profile-wrapper">
      {/* -------------------------------Company Card Section----------------------------- */}
      <div className="company-card">
        <div className="company-header">
          <img
            className="company-logo"
            src="/StarBucks.png"
            alt="company logo"
          />
          <div className="company-name">
            <h2> Wick Enterprices Pvt Ltd</h2>
          </div>
        </div>
      </div>
      {/*------------------------------- Company bio-------------------------------- */}
      <div className="bio-section">
        <h4>About Company</h4>
        <p>
          Wick Enterprises is a leading global company known for innovation and
          excellence in the operations sector. Our team, led by professionals
          like {contact.firstName} {contact.lastName}, delivers world-class
          solutions across various domains.
        </p>
      </div>

      {/*---------------------------- Company Details Section ---------------------------*/}
      <div className="contact-details">
        <h4>Company Information</h4>
        <div className="details-grid">
          <div>
            <strong>Company Name:</strong> Wick Enterprises Pvt Ltd
          </div>
          <div>
            <strong>Designation:</strong> Senior Manager
          </div>

          <div>
            <strong>Date of Joining:</strong> 12/03/2019
          </div>
          <div>
            <strong>WareHouse Address:</strong> J&K
          </div>
          <div>
            <strong>Email :</strong> Example@.com
          </div>
          <div>
            <strong>Website:</strong> WWW.@.com
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
