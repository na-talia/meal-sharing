import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MealsCSS from "./UI/meals.module.css";
import { Link } from "react-router-dom";
import ReservationForm from "./ReservationForm";
import ReviewForm from "./ReviewForm";
import ShowReviews from "./ShowReviews";
import Pizza from "./UI/pizza1.png";

const MealDetails = () => {
  const [mealDetails, setMealDetails] = useState("");
  const [availableReservations, setAvialableReservations] = useState([]);
  const [reservationsList, setReservationsList] = useState([]);

  const { mealId } = useParams();

  useEffect(() => {
    (async () => {
      const data = await fetch(`api/meals/${mealId}`).then((response) =>
        response.json()
      );
      setMealDetails(data[0]);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await fetch("api/meals?availableReservations=true").then(
        (data) => data.json()
      );
      setAvialableReservations(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await fetch(`api/meals/${mealId}/reservation`).then((data) =>
        data.json()
      );
      setReservationsList(data[0]);
    })();
  }, []);

  // Checks how many reservations left

  const availableReservationsLeft =
    reservationsList.length !== 0
      ? mealDetails.max_reservations - reservationsList.sum_of_guests
      : mealDetails.max_reservations;

  // Checks if ReservationForm should be shown or not

  const showReservationForm = availableReservations.find(
    (meal) => parseInt(meal.id) === parseInt(mealDetails.id)
  ) ? (
    <ReservationForm />
  ) : (
    <button className={MealsCSS.noAvailableMeals} disabled>
      There are no available meals left...
    </button>
  );

  return (
    <div>
      {mealDetails ? (
        <div className={MealsCSS.container} key={mealDetails.id}>
          <div className={MealsCSS.listDetails}>
            <div className={MealsCSS.detailsBlock}>
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
                  <b className={MealsCSS.availableLeft}>
                    AVAILABLE RESERVATIONS LEFT:&nbsp;
                  </b>
                  {availableReservationsLeft}
                </li>
                <li>
                  <b>PRICE: </b>
                  {mealDetails.price} DKK
                </li>
              </ul>
              <img src={Pizza} alt="Pizza" className={MealsCSS.pizzaImgSmall} />
            </div>
            <div className={MealsCSS.buttons}>
              {showReservationForm}
              <ReviewForm />
            </div>
            <ShowReviews />
          </div>
        </div>
      ) : (
        <div>
          <div className={MealsCSS.noMealFound}>
            <p>No meal found... </p>
            <Link to="/meals">
              <button>Go back</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealDetails;
