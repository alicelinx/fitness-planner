const express = require('express');
const router = express.Router();
const workoutsQuery = require('../db/queries/workouts-by-id.js');



router.get('/', (req, res) => {
  // const userID = req.session.user.id;
  userID = 1;
  workoutsQuery.getWorkoutById(userID)
    .then(data => {
      res.send(data);
      // res.json(data);
    });
});


module.exports = router;