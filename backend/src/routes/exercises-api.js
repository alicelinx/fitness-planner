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


router.get('/:id', (req, res) => {
  const workoutId = req.params.id;
  getExercisesByWorkoutId.getExercisesByWorkoutId(Number(workoutId))
    .then(data => {
      res.json(data);
    });
});

router.post('/:id', (req, res) => {
  const workoutId = req.params.id;
  getExercisesByWorkoutId.getExercisesByWorkoutId(Number(workoutId))
    .then(data => {
      res.json(data);
    });
});

module.exports = router;