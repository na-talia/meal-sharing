import React from "react";
import MealsCSS from "./UI/meals.module.css";
import { Link } from "react-router-dom";

const Meal = ({ meal }) => {
  return (
    <div className={MealsCSS}>
      <ul className={MealsCSS.mealList}>
        <span className={MealsCSS.mealId}>№ {meal.id}</span>
        <h3 className={MealsCSS.mealTitle}>{meal.title}</h3>
        <li>{meal.description}</li>
        <li>
          <span className={MealsCSS.price}>Price: </span>
          {meal.price} DKK
        </li>
        <li>
          {" Here will be a link to each meal by id "}
          {" <Link to={`/meals/${meal.id}`}> "}
          <button>Show more</button>
          {"  </Link> "}
        </li>
      </ul>
    </div>
  );
};

export default Meal;
