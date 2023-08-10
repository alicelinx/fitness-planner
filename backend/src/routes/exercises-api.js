const express = require('express');
const router = express.Router();
const getExercises = require('../db/queries/get-exercises');


router.get('/', (req, res) => {
  getExercises.getAllExercisesForDropDownMenu()
    .then(data => {
      res.json(data);
    });
});

module.exports = router;