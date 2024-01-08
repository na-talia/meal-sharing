import React, { useState } from "react";
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
      meal_id: mealId,
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
            value={mealId.value}
            onChange={() => setIdOfMeal(mealId)}
            className={ReservationCSS.mealId}
          >
            {mealId}
          </span>
          <div>
            <span className={ReservationCSS.contactName}>
              <label>Contact name: </label>
              <input
                type="text"
                placeholder="Name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
              />
            </span>
            <span className={ReservationCSS.phone}>
              <label>Phone number: </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </span>
          </div>
          <div>
            <span className={ReservationCSS.email}>
              <label>Email: </label>
            </span>
            <input
              type="email"
              placeholder="email@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className={ReservationCSS.guests}>
              <label>№ of guests: </label>
              <input
                type="number"
                min={1}
                value={numberOfGuests}
                onChange={(e) => setNumberOfGuests(e.target.value)}
                required
              />
            </span>
          </div>
          <button type="submit">Make a reservation</button>
        </form>
      )}
    </div>
  );
};

export default ReservationForm;
