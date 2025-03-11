import React from "react";
import "./Styles/NavLinks.css";

function NavLinks() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <button className="nav-button">Dashboard ▼</button>
        </li>
        <li>
          <button className="nav-button">Vehicles ▼</button>
        </li>
        <li>
          <button className="nav-button">Sales </button>
        </li>
        <li>
          <button className="nav-button">Website </button>
        </li>
        <li>
          <button className="nav-button">Business </button>
        </li>
      </ul>
    </nav>
  );
}
export default NavLinks;
