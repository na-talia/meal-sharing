import React from "react";
import MealsCSS from "./UI/meals.module.css";

const Title = ({ title }) => {
  return <h1 className={MealsCSS.title}>{title}</h1>;
};

export default Title;
