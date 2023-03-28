import React, { useEffect, useState } from "react";
import Meal from "./Meal";
import Title from "./Title";
import MealsCSS from "./UI/meals.module.css";
import MainCSS from "./UI/main.module.css";
import { Link } from "react-router-dom";

const MealLimit = () => {
  const [limit, setLimit] = useState([]);

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
      <Title title="Pizza Sharing" />
      {renderLimitMeal}
      <Link to={"/meals"}>
        <button className={MainCSS.showAll}>Show All Meals</button>
      </Link>
    </div>
  );
};

export default MealLimit;
