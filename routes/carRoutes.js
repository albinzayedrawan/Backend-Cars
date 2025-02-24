const express = require('express');
const Car = require('../models/carModel');
const router = express.Router();

// Create a new car
router.post('/cars', async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).send(car);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Retrieve all cars
router.get('/cars', async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).send(cars);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Retrieve a car by ID
router.get('/cars/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).send();
    }
    res.status(200).send(car);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a car by ID
router.put('/cars/:id', async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!car) {
      return res.status(404).send();
    }
    res.status(200).send(car);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a car by ID
router.delete('/cars/:id', async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).send();
    }
    res.status(200).send(car);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;