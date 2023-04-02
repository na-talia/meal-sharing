import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TestComponent from "./components/TestComponent/TestComponent";
import MealList from "./components/MealList";
import Title from "./components/Title";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <Route exact path="/">
        <NavBar />
        <Title title="Meal Sharing" />
        <MealList />
      </Route>
      <Route exact path="/lol">
        <p>lol</p>
      </Route>
      <Route exact path="/test-component">
        <TestComponent></TestComponent>
      </Route>
    </Router>
  );
}

export default App;
