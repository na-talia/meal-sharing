import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ReviewCSS from "./UI/form.module.css";

const ReviewForm = () => {
  const [idOfMeal, setIdOfMeal] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState("");
  const [showReviews, setShowReviews] = useState(false);

  const { mealId } = useParams();

  const submitReview = (e) => {
    e.preventDefault();

    const data = {
      meal_id: mealId,
      title,
      description,
      stars,
      created_date: new Date().toJSON().slice(0, 10),
    };

    fetch("api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        setTitle("");
        setDescription("");
        setStars("");
      })
      .catch((error) => {
        alert(error);
      })
      .finally(alert(`You review on meal № ${mealId} was sent`));
  };

  const showReviewForm = () => {
    setShowReviews(!showReviews);
  };

  return (
    <div>
      <button onClick={showReviewForm}>
        {!showReviews ? "Write a review" : "Hide review form"}
      </button>
      {showReviews && (
        <form onSubmit={submitReview} className={ReviewCSS}>
          <h2>Write your review</h2>
          <label>Meal ID: </label>
          <span
            value={mealId.value}
            onChange={() => setIdOfMeal(mealId)}
            className={ReviewCSS.mealId}
          >
            {mealId}
          </span>
          <div>
            <label>Title: </label>
            <input
              type="text"
              placeholder="Title"
              className={ReviewCSS.inputTitle}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className={ReviewCSS.description}>
            <label>Description: </label>
            <div>
              <textarea
                type="text"
                placeholder="Your description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>

          <label>Rating from 1 to 5: </label>
          <input
            type="number"
            min={1}
            max={5}
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            required
          />
          <div>
            <button type="submit">Send a review</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;
