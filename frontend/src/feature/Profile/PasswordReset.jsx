import React from "react";
import "./Styles/ProfileBody.css";

const PasswordReset = () => {
  return (
    <div className="profile-body">
      <div className="profile-wrapper">
        <div className="password-field">
          <h3>
            Old Password
            <span className="info-icon">
              <span className="info-circle">?</span>
              <span className="colon-icon">:</span>
            </span>
          </h3>
          <input
            className="password-box"
            placeholder="Enter  Old Password"
            type="password"
          ></input>
          <h3>
            New Password
            <span className="info-icon">
              <span className="info-circle">?</span>
              <span className="colon-icon">:</span>
            </span>
          </h3>
          <input
            className="password-box"
            placeholder="Enter New Password"
            type="password"
          ></input>
          <h3>
            Confirm Password
            <span className="info-icon">
              <span className="info-circle">?</span>
              <span className="colon-icon">:</span>
            </span>
          </h3>
          <input
            className="password-box"
            placeholder="Confirm Password"
            type="password"
          ></input>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
