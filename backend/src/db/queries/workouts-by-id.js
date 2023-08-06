const db = require('../connection.js');

const getWorkoutById = (id) => {
  return db
    .query(`
    SELECT * FROM workouts
    WHERE id = $1`, [id])
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.log('Query Error: ', err);
    });
};

module.exports = { getWorkoutById };