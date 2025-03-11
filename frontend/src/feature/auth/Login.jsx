// Main container for the login Page
import React from "react";
import Footer from "./Footer";
import Form from "./Form";
import LoginImage from "./LoginImage";

const Login = () => {
  return (
    <div className="login-container">
      <div className="logo-container">
        <img src="/carLogo.png" alt="Auto-Hub" className="logo" />
        <span className="logo-text"> Auto Hub</span>
      </div>
      <div className="login-left">
        <Form route="api/auth/login/" method="login" />
        <Footer />
      </div>
      <LoginImage />
    </div>
  );
};
export default Login;
