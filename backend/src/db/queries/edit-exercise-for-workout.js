const db = require('../connection');

const editExerciseByWorkoutId = (exercise) => {
  return db
    .query(`
    UPDATE exercises
    SET title = $1,
        set_number = $2,
        rep_number = $3,
        weight_number = $4
    WHERE id = $5
    RETURNING *`, [exercise.title, exercise.sets, exercise.reps, exercise.weights, exercise.id])
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.log('Query Error: ', err);
      throw err;
    });
};

module.exports = { editExerciseByWorkoutId };

