const express = require("express");
const router = express.Router();
const knex = require("../database");

// GET - Returns all reservations http://localhost:3000/api/reservations

router.get("/", async (req, res) => {
  try {
    const getAllReservations = await knex.select("*").table("reservation");

    if (getAllReservations.length !== 0) {
      res.send(getAllReservations);
    } else {
      res.status(204).send("There are no reservations found");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    throw error;
  }
});

// POST - Adds a new reservation to the database

router.post("/", async (req, res) => {
  try {
    const addNewReservation = await knex("reservation").insert(req.body);
    if (addNewReservation) {
      res.status(201).send("The reservation was added");
    } else {
      res.status(400).send("The reservation cannot be added");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    throw error;
  }
});

// GET - Returns a reservation by id

router.get("/:id", async (req, res) => {
  try {
    const reservationById = await knex
      .select("*")
      .from("reservation")
      .where({ id: req.params.id });

    if (reservationById.length !== 0) {
      res.send(reservationById);
    } else {
      res
        .status(404)
        .send(`The reservation with ID ${req.params.id} is not found`);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    throw error;
  }
});

// PUT - Updates the reservation by id

router.put("/:id", async (req, res) => {
  try {
    const reservationById = await knex("reservation").where({
      id: req.params.id,
    });

    if (reservationById.length === 0) {
      res
        .status(404)
        .send(`The reservation with ID ${req.params.id} is not found`);
    } else {
      await knex("reservation").where({ id: req.params.id }).update(req.body);
      const updatedReservation = await knex("reservation").where({
        id: req.params.id,
      });
      res.send(updatedReservation);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    throw error;
  }
});

// DELETE - Deletes the reservation by id

router.delete("/:id", async (req, res) => {
  try {
    const reservationById = await knex("reservation").where({
      id: req.params.id,
    });

    if (reservationById.length === 0) {
      res
        .status(404)
        .send(`The reservation with ID ${req.params.id} is not found`);
    } else {
      await knex("reservation").where({ id: req.params.id }).del();
      res.send(`The reservation with ID ${req.params.id} is deleted`);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    throw error;
  }
});

module.exports = router;
