import React from "react";
import TitleCSS from "./UI/main.module.css";
import Pizza from "./UI/pizza.png";

const Title = ({ title }) => {
  return (
    <div>
      <h1 className={TitleCSS.title}>{title}</h1>
      <div className={TitleCSS.border}>
        <div className={TitleCSS.subtitle}>
          Do you love pizza? Then you have come to the right place. You have a
          great opportunity to try delicious and unusual pizzas that you can
          find on our website. You can reserve a pizza, read reviews from other
          users, as well as share your own opinion about the pizza that you have
          tried.
        </div>
        <div>
          <img src={Pizza} alt="Pizza" className={TitleCSS.pizzaImg} />
          <div className={TitleCSS.hungry}>
            <span>Hungry?</span>
            <p>It's time to eat!</p>
          </div>
        </div>
        
        <p className={TitleCSS.calltoAction}>
          WHAT PIZZA DO YOU WANT TODAY?
          <span className={TitleCSS.search}> LET'S SEARCH!</span>
        </p>
      </div>
    </div>
  );
};

export default Title;
