import React, { useState } from "react";
import "./Styles/ProfileBody.css";
import { red } from "@mui/material/colors";

const PersonalInfo = () => {
  const [contact, setContact] = useState({
    firstName: "John",
    lastName: "Wick",
    img: "/Moon River.jpeg",
    emailAddress: "johnwick@wickstation.com",
    phoneNumber: "+91-(009)-0009",
    dateOfBirth: "2000-01-01", // Default DOB (YYYY-MM-DD format)
    gender: "Male",
    role: "Admin",
    bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Curabitur sodales sit amet nunc et vehicula. Mauris sed lectus nisi.",
  });
  // Sate to toggle a popup for editing
  const [isEditing, setIsEditing] = useState(false);
  //for phone number error
  const [phoneError, setPhoneError] = useState("");

  // state for tempory editing
  const [editedContact, setEditedContact] = useState(contact);

  // open modal for edit
  const handleEdit = () => {
    setEditedContact(contact);
    setIsEditing(true);
  };

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // for Phone numbers allows only numbers and + - . symbols
    if (name === "phoneNumber") {
      if (!/^\d*$/.test(value)) {
        return;
      }
      setPhoneError(value.length < 10 ? "Phone number must be 10 digits " : "");
    }
    setEditedContact((prevContact) => ({ ...prevContact, [name]: value }));
  };

  // save edited details
  const handleSave = () => {
    setContact(editedContact);
    setIsEditing(false);
  };

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
      <div className="edit-btn-container">
        <button className="edit-btn" onClick={handleEdit}>
          Edit
        </button>
      </div>
      {/* Edit popup */}
      {isEditing && (
        <div className={`modal ${isEditing ? "active" : ""}`}>
          <div className="modal-content">
            <h3>Edit Profile</h3>
            <label>
              First Name :
              <input
                type="text"
                name="firstName"
                value={editedContact.firstName}
                onChange={handleChange}
              ></input>
            </label>
            <label>
              Last Name :
              <input
                type="text"
                name="lastName"
                value={editedContact.lastName}
                onChange={handleChange}
              ></input>
            </label>
            <label>
              Email Address :
              <input
                type="text"
                name="emailAddress"
                value={editedContact.emailAddress}
                onChange={handleChange}
              ></input>
            </label>
            <label>
              Phone Number:
              <input
                type="tel"
                name="phoneNumber"
                placeholder="91 *****"
                maxLength="10"
                value={editedContact.phoneNumber}
                onChange={handleChange}
                required
              ></input>
            </label>
            {phoneError && <p style={{ color: "red" }}>{phoneError}</p>}
            <label>
              Date of Birth:
              <input
                type="date"
                name="dateOfBirth"
                value={editedContact.dateOfBirth}
                onChange={handleChange}
              ></input>
            </label>
            <label>
              Gender :
              <select
                name="gender"
                value={editedContact.gender || ""}
                onChange={handleChange}
              >
                <option>Select a Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Nonbinary">Nonbinary</option>
                <option value="Transgender">Transgender</option>
              </select>
            </label>
            <label>
              Role:
              <input
                type="text"
                name="role"
                value={editedContact.role}
                onChange={handleChange}
              ></input>
            </label>
            <label>
              Bio:
              <textarea
                name="bio"
                value={editedContact.bio || ""}
                onChange={handleChange}
                rows="4"
                placeholder="Write something about yourself..."
              ></textarea>
            </label>
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-btn" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
