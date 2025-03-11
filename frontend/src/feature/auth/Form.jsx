import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../shared/constants/constants";
import "../../shared/Styles/Form.css";
import PasswordField from "./PasswordField";

function Form({ route, method }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // const name = method === "login" ? "login" : "Register";

  /* ---- HandleSubmit defien-----*/
  const handleSubmit = async (e) => {
    // console.log("Username:", username);
    // console.log("Password:", password);
    setLoading(true);
    setErrorMessage("");
    e.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:8000/${route}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Authentication failed");
      }

      const data = await response.json();

      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, data.access);
        localStorage.setItem("user", JSON.stringify({ name: email })); // Saves user info
        localStorage.setItem(REFRESH_TOKEN, data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMessage(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="login-left">
        <div className="login-box">
          <h2>Get Started Now</h2>
          <p>Enter your credentials to access your account</p>
          <h3>LogIn</h3>
          <hr />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {/* Show error message */}
          <div className="input-wrapper">
            <input
              id="1"
              className="input-field"
              type="text"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <PasswordField
            id="2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="loginbtn" disabled={loading}>
            Login
          </button>
        </div>
      </div>
    </form>
  );
}

export default Form;
