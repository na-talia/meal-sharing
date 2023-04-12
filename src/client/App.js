import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TestComponent from "./components/TestComponent/TestComponent";
import MealList from "./components/MealList";
import NavBar from "./components/NavBar";
import MealDetails from "./components/MealDetails";
import MainPage from "./components/MainPage";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  return (
    <Router>
      <NavBar />
      <Route exact path="/">
        <MainPage />
      </Route>
      <Route exact path="/meals">
        <MealList />
      </Route>
      <Route exact path="/meals/:mealId">
        <MealDetails />
      </Route>
      <Route exact path="/about">
        <About />
      </Route>
      <Route exact path="/test-component">
        <TestComponent></TestComponent>
      </Route>
      <Footer />
    </Router>
  );
}

export default App;
