import React from "react";
import { Link } from "react-router-dom";
import NavbarCSS from "./UI/main.module.css";

const NavBar = () => {
  return (
    <div className={NavbarCSS.navbar}>
      <Link to="/">
        <li>Home</li>
      </Link>
      <Link to="/meals">
        <li>All Meals</li>
      </Link>
      <Link to="/about">
        <li>About us</li>
      </Link>
    </div>
  );
};

export default NavBar;
