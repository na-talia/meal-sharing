import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewCSS from "./UI/main.module.css";

const ShowReviews = () => {
  const [listOfReviews, setListOfReviews] = useState([]);
  const { mealId } = useParams();

  useEffect(() => {
    (async () => {
      const data = await fetch(`api/meals/${mealId}/reviews`).then((data) =>
        data.json()
      );
      setListOfReviews(data);
    })().catch((error) => {
      console.log(error.message);
    });
  }, []);

  const renderReviews = listOfReviews.length ? (
    <div className={ReviewCSS.whiteBorder}>
      <h2 className={ReviewCSS.reviewTitle}>Reviews</h2>
      {listOfReviews.map((review) => {
        return (
          <div key={review.id} className={ReviewCSS.reviewBlock}>
            <h3>{review.title}</h3>
            <li>{review.description}</li>
            <li>
              <b>RATING </b>
              <span className={ReviewCSS.rating}>{review.stars} / 5</span>
            </li>
          </div>
        );
      })}
    </div>
  ) : (
    <div className={ReviewCSS.noReviews}>No reviews yet...</div>
  );
  return (
    <div>
      <div>{renderReviews}</div>
    </div>
  );
};

export default ShowReviews;
