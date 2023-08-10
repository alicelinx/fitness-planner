const express = require('express');
const router = express.Router();
const getExercises = require('../db/queries/get-exercises');
const getExercisesByWorkoutId = require('../db/queries/get-exercises-by-workout-id');


router.get('/', (req, res) => {
  getExercises.getAllExercisesForDropDownMenu()
    .then(data => {
      res.json(data);
    });
});


router.get('/:id', (req,res) => {
  getExercisesByWorkoutId.getExercisesByWorkoutId(req.params)
    .then(data => {
      res.json(data);
    });
});

module.exports = router;