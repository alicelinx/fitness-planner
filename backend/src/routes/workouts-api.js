const express = require('express');
const router = express.Router();
const getWorkouts = require('../db/queries/get-workout');
const addWorkouts = require('../db/queries/add-workout');



router.get('/', (req, res) => {
  const userId = req.query.id;
  getWorkouts.getWorkoutById(userId)
    .then(data => {
      res.json(data);
    });
});

router.post('/', (req, res) => {
  const userId = req.session.user.id;
  const workoutTitle = req.body;
  addWorkouts.addWorkout(userId, workoutTitle);
});


module.exports = router;