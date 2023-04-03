import React, { useEffect, useState } from "react";
import MealsCSS from "./UI/meals.module.css";
import MainCSS from "./UI/main.module.css";
import Meal from "./Meal";

const MealList = () => {
  const [listOfMeals, setListOfMeals] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [sortKey, setSortKey] = useState([]);

  useEffect(() => {
    if (inputValue === "") {
      (async () => {
        const data = await fetch("api/meals").then((data) => data.json());
        setListOfMeals(data);
        setSortKey(data);
      })();
    } else {
      (async () => {
        const data = await fetch(`api/meals?title=${String(inputValue)}`).then(
          (data) => data.json()
        );
        setListOfMeals(data);
      })().catch((error) => {
        console.log(error.message);
      });
    }
  }, [inputValue]);

  const renderMeal = listOfMeals.length ? (
    <div className={MealsCSS.list}>
      {listOfMeals
        .sort((a, b) => {
          if (sortKey === "price") {
            return a.price - b.price;
          } else if (sortKey === "price desc") {
            return b.price - a.price;
          } else if (sortKey === "max_reservations") {
            return b.max_reservations - a.max_reservations;
          } else if (sortKey === "max_reservations desk") {
            return a.max_reservations - b.max_reservations;
          } else if (sortKey === "when") {
            return new Date(a.when) - new Date(b.when);
          } else if (sortKey === "when desk") {
            return new Date(b.when) - new Date(a.when);
          }
        })
        .map((meal) => {
          return <Meal key={meal.id} meal={meal} />;
        })}
    </div>
  ) : (
    <div className={MealsCSS.noMealFound}>Meals not found...</div>
  );

  return (
    <div>
      <h1 className={MainCSS.title}>ALL MEALS</h1>
      <div className={MealsCSS.filter}>
        <input
          className={MealsCSS.input}
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search for a pizza..."
        ></input>
        <select
          className={MealsCSS.select}
          onChange={(e) => setSortKey(e.target.value)}
        >
          <option dafaultvalue="none" hidden>
            Sort by
          </option>
          <option value="when">CREATED DATE(oldest first)</option>
          <option value="when desk">CREATED DATE (newest first)</option>
          <option value="max_reservations">
            RESERVATION SPOTS (more first)
          </option>
          <option value="max_reservations desk">
            RESERVATION SPOTS (less first)
          </option>
          <option value="price">PRICE (lowest first)</option>
          <option value="price desc">PRICE (higest first)</option>
        </select>
      </div>
      <div>{renderMeal}</div>
    </div>
  );
};

export default MealList;
