import React from "react";
import { Link } from "react-router-dom";
import NavbarCSS from "./UI/main.module.css";
import logo from "./UI/pizza-icon.png";

const NavBar = () => {
  return (
    <div className={NavbarCSS.navbar}>
      <Link to="/">
        <li className={NavbarCSS.logo}>
          Pizza <img src={logo} className={NavbarCSS.logoImg} />
          <br />
          Sharing
        </li>
      </Link>
      <Link to="/meals">
        <li className={NavbarCSS.liHover}>All Meals</li>
      </Link>
      <Link to="/about">
        <li className={NavbarCSS.liHover}>About us</li>
      </Link>
    </div>
  );
};

export default NavBar;
