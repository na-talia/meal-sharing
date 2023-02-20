const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (req, res) => {
  let selectedMeals = knex.select("meal.*").from("meal");

  // Returns all meals that are cheaper than maxPrice. (api/meals?maxPrice=90)

  if ("maxPrice" in req.query) {
    selectedMeals.where("price", "<=", req.query.maxPrice);
  }

  //Returns all meals that still have available spots left, if true.
  // If false, return meals that have no available spots left. (api/meals?availableReservations=true)

  if ("availableReservations" in req.query) {
    selectedMeals
      .innerJoin("reservation", "reservation.meal_id", "=", "meal.id")
      .groupBy("meal.id", "meal.title");
    if (req.query.availableReservations === "false") {
      selectedMeals.having(
        "meal.max_reservations",
        "<=",
        knex.raw("SUM(reservation.number_of_guests)")
      );
    } else {
      selectedMeals.having(
        "meal.max_reservations",
        ">",
        knex.raw("SUM(reservation.number_of_guests)")
      );
    }
  }

  // Returns all meals that partially match the given title.
  // Rød grød will match the meal with the title Rød grød med fløde. (api/meals?title=Indian%20platter)

  if ("title" in req.query) {
    const mealTitle = String(req.query.title).toLowerCase();
    selectedMeals.where("title", "like", `%${mealTitle}%`);
  }

  // Returns all meals where the date for when is after the given date. (api/meals?dateAfter=2022-10-01)

  if (req.query.dateAfter) {
    selectedMeals.where("when", ">", req.query.dateAfter);
  }

  // Returns all meals where the date for when is before the given date.  (api/meals?dateBefore=2022-08-08)

  if (req.query.dateBefore) {
    selectedMeals.where("when", "<", req.query.dateBefore);
  }

  // Returns the given number of meals. (api/meals?limit=7)

  if ("limit" in req.query) {
    selectedMeals.limit(req.query.limit);
  }
  // Returns all meals sorted by the given key. (api/meals?sortKey=price)
  // Returns all meals sorted in the given direction. (api/meals?sortKey=price&sortDir=desc)

  const sortedByKey = req.query.sortKey;
  const sortedByDirection = req.query.sortDir;
  if (["when", "max_reservavtions", "price"].includes(sortedByKey)) {
    if (sortedByDirection === "asc" || sortedByDirection === "desc") {
      selectedMeals.orderBy(sortedByKey, sortedByDirection);
    } else {
      selectedMeals.orderBy(sortedByKey);
    }
  }

  try {
    const result = await selectedMeals;
    if (result.length !== 0) {
      res.json(result);
    } else {
      res.status(404).json({ message: "No meals found!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
    throw Error;
  }
});

//Returns all reviews for a specific meal (/api/meals/:meal_id/reviews)

router.get("/:meal_id/reviews", async (req, res) => {
  const query = knex
    .select("review.*")
    .from("review")
    .innerJoin("meal", "review.meal_id", "=", `meal.id`)
    .having("meal_id", "=", req.params.meal_id);
  try {
    const findReviews = await query;
    if (findReviews.length) {
      res.json(findReviews);
    } else {
      res.status(404).send("No reviews found");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    throw Error;
  }
});

// GET - Returns all meals http://localhost:3000/api/meals

router.get("/", async (req, res) => {
  try {
    const getAllMeals = await knex.select("*").table("meal");

    if (getAllMeals.length !== 0) {
      res.send(getAllMeals);
    } else {
      res.status(204).send("There are no meals found");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    throw error;
  }
});

// POST - Adds a new meal to the database

router.post("/", async (req, res) => {
  try {
    const addNewMeal = await knex("meal").insert(req.body);
    if (addNewMeal) {
      res.status(201).send("The meal was added");
    } else {
      res.status(400).send("The meal cannot be added");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    throw error;
  }
});

// GET - Returns the meal by id

router.get("/:id", async (req, res) => {
  try {
    const mealById = await knex
      .select("*")
      .from("meal")
      .where({ id: req.params.id });

    if (mealById.length !== 0) {
      res.send(mealById);
    } else {
      res.status(404).send(`The meal with ID ${req.params.id} is not found`);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    throw error;
  }
});

// PUT - Updates the meal by id

router.put("/:id", async (req, res) => {
  try {
    const mealById = await knex("meal").where({ id: req.params.id });

    if (mealById.length === 0) {
      res.status(404).send(`The meal with ID ${req.params.id} is not found`);
    } else {
      await knex("meal").where({ id: req.params.id }).update(req.body);
      const updatedMeal = await knex("meal").where({ id: req.params.id });
      res.send(updatedMeal);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    throw error;
  }
});

// DELETE - Deletes the meal by id

router.delete("/:id", async (req, res) => {
  try {
    const mealById = await knex("meal").where({ id: req.params.id });

    if (mealById.length === 0) {
      res.status(404).send(`The meal with ID ${req.params.id} is not found`);
    } else {
      await knex("meal").where({ id: req.params.id }).del();
      res.send(`The meal with ID ${req.params.id} is deleted`);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    throw error;
  }
});

module.exports = router;
