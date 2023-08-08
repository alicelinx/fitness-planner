const express = require('express');
const router = express.Router();
const getWorkouts = require('../db/queries/get-workout');
const addWorkouts = require('../db/queries/add-workout');
const addExerciseByWorkoutId = require('../db/queries/add-exercise-for-workout')




router.get('/:id', (req, res) => {
  const userId = req.params.id;
  getWorkouts.getWorkoutById(Number(userId))
    .then(data => {
      res.json(data);
    });
});

router.post('/create/:id', (req, res) => {
  const userId = req.params.id;
  const title = req.body.title;
  const exercises = req.body.exercises // array of objects
  
  addWorkouts.addWorkout(userId,title)
    .then(workoutId =>  {
      for (const exercise of exercises) {
        addExerciseByWorkoutId.addExerciseByWorkoutId(workoutId, exercise)
      }
    })
  res.sendStatus(200);
});


module.exports = router;