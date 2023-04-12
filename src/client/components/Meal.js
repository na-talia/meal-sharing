import React from "react";
import MealsCSS from "./UI/meals.module.css";
import { Link } from "react-router-dom";

const Meal = ({ meal: { id, title, price, when, max_reservations } }) => {
  return (
    <div className={MealsCSS}>
      <ul className={MealsCSS.mealList}>
        <span className={MealsCSS.mealId}>№ {id}</span>
        <h3 className={MealsCSS.mealTitle}>{title}</h3>
        <li>Created date: {when.slice(0, 10)}</li>
        <li>Max reservations: {max_reservations}</li>
        <li>
          <span className={MealsCSS.price}>Price: </span>
          {price} DKK
        </li>
        <li>
          <Link to={`/meals/${id}`}>
            <button>Show more</button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Meal;
