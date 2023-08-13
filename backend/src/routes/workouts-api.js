const express = require('express');
const router = express.Router();
const getWorkouts = require('../db/queries/get-workout');
const addWorkouts = require('../db/queries/add-workout');
const addExerciseByWorkoutId = require('../db/queries/add-exercise-for-workout');
const deleteWorkout = require('../db/queries/delete-workout');
const editExercisesByWorkoutId = require('../db/queries/edit-exercise-for-workout');
const editWorkouts = require('../db/queries/edit-workout');

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  getWorkouts.getWorkoutById(Number(userId))
    .then(data => {
      res.json(data);
    });
});

router.delete('/:id', (req, res) => {
  const workoutId = req.params.id;
  deleteWorkout.deleteWorkoutByWorkoutId(Number(workoutId))
    .then(data => {
      res.json(data);
    });
});

router.post('/create/:id', (req, res) => {
  const userId = req.params.id;
  const title = req.body.title;
  const exercises = req.body.exercises; // array of objects

  addWorkouts.addWorkout(userId, title)
    .then(workoutId => {
      for (const exercise of exercises) {
        addExerciseByWorkoutId.addExerciseByWorkoutId(workoutId, exercise);
      }
    });
  res.sendStatus(200);
});

router.post('/edit/:id', (req, res) => {
  const userId = req.params.id;
  const title = req.body.title;
  const workoutId = req.body.workoutId;
  const exercises = req.body.exercises; // array of objects

  editWorkouts.editWorkout(userId, title, workoutId).then(_ => {
    Promise.all(exercises.flatMap(exercise => editExercisesByWorkoutId.editExerciseByWorkoutId(exercise))).then(data => {
      res.json(data.flat());
    });
  });
});


module.exports = router;