import React, { useEffect, useState } from "react";
import RingLoader from "react-spinners/RingLoader"; //npm install --save react-spinners
import MealsCSS from "./UI/meals.module.css";
import MainCSS from "./UI/main.module.css";
import Meal from "./Meal";

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
        return <Meal key={meal.id} meal={meal} />;
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
          color="#ffff"
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <div>
          <h1 className={MainCSS.title}>ALL MEALS</h1>
          <div>{renderMeal}</div>
        </div>
      )}
    </div>
  );
};

export default MealList;
