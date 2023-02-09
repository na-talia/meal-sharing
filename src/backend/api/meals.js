const express = require("express");
const router = express.Router();
const knex = require("../database");

// GET - Returns all meals

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
      const updatedMeal = await knex("meal").where({ id: req.params.id });
      await knex("meal").where({ id: req.params.id }).update(req.body);
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
