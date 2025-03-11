import React from "react";
import Logo from "./NavLogo";
import NavLinks from "./NavLinks";
import "./Styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Logo />
      <NavLinks />
    </nav>
  );
}
export default Navbar;
