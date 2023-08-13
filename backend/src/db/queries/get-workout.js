const db = require('../connection');

const getWorkoutById = (id) => {
  return db
    .query(`
    SELECT * FROM workouts
    WHERE user_id = $1
    ORDER BY id`, [id])
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.log('Query Error: ', err);
    });
};


module.exports = { getWorkoutById };