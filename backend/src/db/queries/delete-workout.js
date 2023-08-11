const db = require('../connection');

const deleteWorkoutByWorkoutId = (id) => {
  return db
    .query(`
    DELETE FROM workouts
    WHERE id = $1`, [id])
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.log('Query Error: ', err);
    });
};


module.exports = { deleteWorkoutByWorkoutId };