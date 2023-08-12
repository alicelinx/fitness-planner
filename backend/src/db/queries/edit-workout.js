const db = require('../connection');

const editWorkout = (userId, workoutTitle, workoutId) => {
  return db
    .query(`
    UPDATE workouts 
    SET title = $1
    WHERE user_id = $2 AND id = $3
    RETURNING *`, [workoutTitle, userId, workoutId])
    .then(data => {
      return data.rows[0].id;
    })
    .catch(err => {
      console.log('Query Error: ', err);
      throw err;
    });
};

module.exports = { editWorkout };

