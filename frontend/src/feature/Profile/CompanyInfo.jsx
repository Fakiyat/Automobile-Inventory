import React, { useState } from "react";
import "./Styles/ProfileBody.css";

const CompanyInfo = () => {
  const [companyContact, setCompanyContact] = useState({
    aboutCompany:
      " Wick Enterprises is a leading global company known for innovation and excellence in the operations sector. Our team, led by professionals like Jhon Wick , delivers world-class solutions across various domains.",
    companyName: "Wick Enterprises Pvt Ltd",
    designation: "Senior Manager",
    dateOfJoining: "2019-12-03",
    wareHouseAddress: "J&K",
    companyEmail: "Example@wickenterprice.com",
    website: "www.wickenterprice.com",
  });
  //for propup edit modal
  const [popup, setPopup] = useState(false);
  ///for tempory editing input
  const [editedContact, setEditedContact] = useState(companyContact);

  // open modal for edit
  const handlepopup = () => {
    setEditedContact(companyContact);
    setPopup(true);
  };
  // handle imput change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedContact((prevCompanyContact) => ({
      ...prevCompanyContact,
      [name]: value,
    }));
  };

  // handel save
  const handleSave = () => {
    setCompanyContact(editedContact);
    setPopup(false);
  };

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
        <p>{companyContact.aboutCompany}</p>
      </div>

      {/*---------------------------- Company Details Section ---------------------------*/}
      <div className="contact-details">
        <h4>Company Information</h4>
        <div className="details-grid">
          <div>
            <strong>Company Name:</strong> {companyContact.companyName}
          </div>
          <div>
            <strong>Designation:</strong> {companyContact.designation}
          </div>

          <div>
            <strong>Date of Joining:</strong> {companyContact.dateOfJoining}
          </div>
          <div>
            <strong>WareHouse Address:</strong>
            {companyContact.wareHouseAddress}
          </div>
          <div>
            <strong>Company Email :</strong> {companyContact.companyEmail}
          </div>
          <div>
            <strong>Website:</strong> {companyContact.website}
          </div>
        </div>
      </div>
      <div className="edit-btn-container">
        <button className="edit-btn" onClick={handlepopup}>
          Edit
        </button>
      </div>
      {popup && (
        <div className={`modal ${popup ? "active" : ""}`}>
          <div className="modal-content">
            <h3>Edit Company</h3>
            <label>
              Company Name:
              <input
                type="text"
                name="companyName"
                value={editedContact.companyName}
                onChange={handleChange}
              ></input>
            </label>
            <label>
              Designation:
              <input
                type="text"
                name="designation"
                value={editedContact.designation}
                onChange={handleChange}
              ></input>
            </label>
            <label>
              Company Email:
              <input
                type="text"
                name="companyEmail"
                value={editedContact.companyEmail}
                onChange={handleChange}
              ></input>
            </label>
            <label>
              WareHouse Address:
              <input
                type="text"
                name="wareHouseAddress"
                value={editedContact.wareHouseAddress}
                onChange={handleChange}
              ></input>
            </label>
            <label>
              Website:
              <input
                type="text"
                name="website"
                value={editedContact.website}
                onChange={handleChange}
              ></input>
            </label>
            <label>
              Date Of Joining:
              <input
                type="date"
                name="dateOfJoining"
                value={editedContact.dateOfJoining}
                onChange={handleChange}
              ></input>
            </label>
            <label>
              About Company:
              <textarea
                name="aboutCompany"
                value={editedContact.aboutCompany || ""}
                onChange={handleChange}
                rows="4"
                placeholder="Write something about your Company..."
              ></textarea>
            </label>
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-btn" onClick={() => setPopup(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyInfo;
