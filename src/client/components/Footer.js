import React from "react";
import FooterCSS from "./UI/main.module.css";

const Footer = () => {
  return (
    <p className={FooterCSS.footer}>
      All rights reserved @ {new Date().toJSON().slice(0, 4)}
    </p>
  );
};

export default Footer;
