import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MealsCSS from "./UI/meals.module.css";
import { Link } from "react-router-dom";
import ReservationForm from "./ReservationForm";
import ReviewForm from "./ReviewForm";

const MealDetails = () => {
  const [loading, setLoading] = useState(false);
  const [mealDetails, setMealDetails] = useState("");
  const [availableReservations, setAvialableReservations] = useState([]);

  const { mealId } = useParams();

  useEffect(() => {
    setLoading(true);
    (async () => {
      const data = await fetch(`api/meals/${mealId}`).then((response) =>
        response.json()
      );
      setMealDetails(data[0]);
    })();
    setLoading(false);
  }, []);

  useEffect(() => {
    (async () => {
      const data = await fetch("api/meals?availableReservations=true").then(
        (data) => data.json()
      );
      setAvialableReservations(data);
    })();
  }, []);

  const showReservationForm = availableReservations.find(
    (meal) => parseInt(meal.id) === parseInt(mealDetails.id)
  ) ? (
    <ReservationForm />
  ) : (
    <span className={MealsCSS.noAvailableMeals}>
      No available meals left...
    </span>
  );

  return (
    <div>
      {loading && <p>Loading...</p>}
      {mealDetails ? (
        <div className={MealsCSS} key={mealDetails.id}>
          <div className={MealsCSS.listDetails}>
            <ul className={MealsCSS.border}>
              <h2 className={MealsCSS.mealTitle}>
                № {mealDetails.id} {mealDetails.title}
              </h2>
              <li>
                <b>DESCRIPTION: </b>
                {mealDetails.description}
              </li>
              <li>
                <b>LOCATION: </b>
                {mealDetails.location}
              </li>
              <li>
                <b>DATE: </b>
                {mealDetails.when.slice(0, 10)}
              </li>
              <li>
                <b>MAX RESERVATIONS: </b>
                {mealDetails.max_reservations}
              </li>

              <li>
                <b>PRICE: </b>
                {mealDetails.price} DKK
              </li>
            </ul>
            <div className={MealsCSS.buttons}>
              {showReservationForm}
              <ReviewForm />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className={MealsCSS}>No meal found</div>
          <Link to="/meals">
            <button>Go back</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MealDetails;
