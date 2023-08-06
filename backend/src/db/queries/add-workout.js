const db = require('../connection');

const addWorkout = (userId, workoutTitle) => {
  return db
    .query(`
    INSERT INTO workouts VALUES
    ($1, false, $3)`, [workoutTitle, userId])
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.log('Query Error: ', err);
    });
};


module.exports = { addWorkout };
