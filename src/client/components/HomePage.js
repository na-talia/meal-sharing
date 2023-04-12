import React, { useEffect, useState } from "react";
import Meal from "./Meal";
import Title from "./Title";
import MealsCSS from "./UI/meals.module.css";
import MainCSS from "./UI/main.module.css";
import { Link } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader"; //npm install --save react-spinners

const MealLimit = () => {
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState([]);

  // Loading spinner

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    (async () => {
      const data = await fetch("api/meals?limit=4").then((data) => data.json());
      setLimit(data);
    })();
  }, []);

  const renderLimitMeal = limit ? (
    <div className={MealsCSS.limitList}>
      {limit.map((meal) => {
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
          <Title title="Pizza Sharing" />
          {renderLimitMeal}
          <Link to={"/meals"}>
            <button className={MainCSS.showAll}>Show All Meals</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MealLimit;
