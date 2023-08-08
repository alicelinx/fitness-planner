const db = require('../connection');

const addWorkout = (userId, workoutTitle) => {
  return db
    .query(`
    INSERT INTO workouts (title, is_complete, user_id) 
    VALUES ($1, false, $2) RETURNING id`, [workoutTitle, userId])
    .then(data => {
      return data.rows[0].id; 
    })
    .catch(err => {
      console.log('Query Error: ', err);
      throw err; 
    });
};

module.exports = { addWorkout };

