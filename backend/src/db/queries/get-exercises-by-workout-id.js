const db = require('../connection');

const getExercisesByWorkoutId = (workoutId) => {
  return db
    .query(`
    SELECT * FROM exercises
    WHERE workout_id = $1`, [workoutId])
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.log('Query Error: ', err);
    });
};


module.exports = { getExercisesByWorkoutId };