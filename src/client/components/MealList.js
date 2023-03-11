import React, { useEffect, useState } from "react";
import RingLoader from "react-spinners/RingLoader"; //npm install --save react-spinners
import MealsCSS from "./meals.module.css";

const MealList = () => {
  const [listOfMeals, setListOfMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  // Loading spinner

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    (async () => {
      const data = await fetch("api/meals").then((data) => data.json());
      setListOfMeals(data);
    })();
  }, []);

  const renderMeal = listOfMeals ? (
    <div className={MealsCSS.list}>
      {listOfMeals.map((meal) => {
        return (
          <ul key={meal.id}>
            <h3>{meal.title}</h3>
            <li>{meal.description}</li>
            <li>Price: {meal.price}</li>
          </ul>
        );
      })}
    </div>
  ) : (
    <div>Meals not found...</div>
  );

  return (
    <div>
      {loading ? (
        <RingLoader
          className={MealsCSS.spinner}
          loading={loading}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <div>{renderMeal}</div>
      )}
    </div>
  );
};

export default MealList;
