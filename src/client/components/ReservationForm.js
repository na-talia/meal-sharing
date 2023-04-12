import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReservationCSS from "./UI/form.module.css";

const ReservationForm = () => {
  const [idOfMeal, setIdOfMeal] = useState("");
  const [contactName, setContactName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [showReservation, setShowReservation] = useState(false);

  const { mealId } = useParams();

  const submitReservation = (e) => {
    e.preventDefault();

    const data = {
      meal_id: idOfMeal,
      contact_name: contactName,
      contact_phonenumber: phoneNumber,
      contact_email: email,
      number_of_guests: numberOfGuests,
      created_date: new Date().toJSON().slice(0, 10),
    };

    fetch("api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data);
        setContactName("");
        setPhoneNumber("");
        setEmail("");
        setNumberOfGuests("");
      })
      .catch((error) => {
        alert(error);
      })
      .finally(alert(`You have reserved a meal № ${mealId}`));
  };

  useEffect(() => {
    (async () => {
      await fetch(`api/meals/${mealId}`).then((response) => response.json());
      setIdOfMeal(mealId);
    })();
  }, []);

  const showReservationForm = () => {
    setShowReservation(!showReservation);
  };

  return (
    <div>
      <button onClick={showReservationForm}>
        {!showReservation ? "Make a reservation" : "Hide reservation form"}
      </button>

      {showReservation && (
        <form onSubmit={submitReservation} className={ReservationCSS}>
          <h2>Make a reservation</h2>
          <label>Meal ID: </label>
          <span
            value={idOfMeal}
            onChange={() => setIdOfMeal(idOfMeal)}
            className={ReservationCSS.mealId}
          >
            {idOfMeal}
          </span>
          <div>
            <label>Contact name:</label>
            <input
              type="text"
              placeholder="Name"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              required
            />
            <label>Phone number:</label>
            <input
              type="tel"
              placeholder="— —  — —  — —  — —"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={ReservationCSS.phone}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              placeholder="email@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Number of guests:</label>
            <input
              type="number"
              min={1}
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(e.target.value)}
              className={ReservationCSS.guests}
              required
            />
          </div>
          <button type="submit">Make a reservation</button>
        </form>
      )}
    </div>
  );
};

export default ReservationForm;
