const express = require('express');
const router = express.Router();
const workoutsQuery = require('../db/queries/workouts-by-id');



router.get('/', (req, res) => {
  const userID = req.session.user.id;
  workoutsQuery.getWorkoutById(userID)
    .then(data => {
      res.json(data);
    });
});


module.exports = router;