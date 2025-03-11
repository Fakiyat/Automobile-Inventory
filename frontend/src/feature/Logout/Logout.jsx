import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style/Logout.css";
import SettingsMenu from "@/shared/components/SettingsMenu";

const Logout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    // change this when i want the protected routing
    // if (!token) navigate("/login");
    const storedUser = JSON.parse(localStorage.getItem("user")) || {
      name: "Guest",
    };
    setUser(storedUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <SettingsMenu handleLogout={handleLogout} />
      <span>Welcome, {user?.name}</span>
    </div>
  );
};

export default Logout;
