const express = require('express');
const router = express.Router();
const workoutsQuery = require('../db/queries/workouts.js');



router.get('/:id', (req, res) => {
  const userID = req.session.user.id;
  workoutsQuery.getWorkoutById(userID)
    .then(data => {
      res.json(data);
    });
});


module.exports = router;