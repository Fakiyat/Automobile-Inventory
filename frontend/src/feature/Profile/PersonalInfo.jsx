import React from "react";
import "./Styles/ProfileBody.css";

const PersonalInfo = ({ contact }) => {
  return (
    <div className="profile-wrapper">
      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-header">
          <img className="profile-avatar" src={contact.img} alt="Profile" />
          <div className="profile-name">
            <h3>
              {contact.firstName} {contact.lastName}
            </h3>
            <span className="role">{contact.role}</span>
            <div className="contact-info">
              <p>{contact.phoneNumber}</p>
              <p>
                <a href={`mailto:${contact.emailAddress}`}>
                  {contact.emailAddress}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Profile Bio Section */}
      <div className="bio-section">
        <h4>Bio</h4>
        <p>{contact.bio}</p>
      </div>

      {/* profile Contact Details */}
      <div className="contact-details">
        <h4>Contact</h4>
        <div className="details-grid">
          <div>
            <strong>First Name:</strong> {contact.firstName}
          </div>
          <div>
            <strong>Last Name:</strong> {contact.lastName}
          </div>
          <div>
            <strong>Email Address:</strong> {contact.emailAddress}
          </div>
          <div>
            <strong>Phone Number:</strong> {contact.phoneNumber}
          </div>
          <div>
            <strong>Date of Birth:</strong> {contact.dateOfBirth}
          </div>
          <div>
            <strong>Gender:</strong> {contact.gender}
          </div>
          <div>
            <strong>Role:</strong> {contact.role}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
