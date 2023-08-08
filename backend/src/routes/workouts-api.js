const express = require('express');
const router = express.Router();
const getWorkouts = require('../db/queries/get-workout');
const addWorkouts = require('../db/queries/add-workout');



router.get('/:id', (req, res) => {
  const userId = req.params.id;
  getWorkouts.getWorkoutById(userId)
    .then(data => {
      res.json(data);
    });
});

router.post('/', (req, res) => {
  return;
});


module.exports = router;