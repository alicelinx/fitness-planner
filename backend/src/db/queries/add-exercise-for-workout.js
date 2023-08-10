const db = require('../connection');

const addExerciseByWorkoutId = (workoutId, exercise) => {
  return db
    .query(`
    INSERT INTO exercises (title, set_number, rep_number, weight_number, workout_id) 
    VALUES ($1, $2, $3, $4, $5)`, [exercise.title, exercise.sets, exercise.reps, exercise.weights, workoutId])
    .catch(err => {
      console.log('Query Error: ', err);
      throw err; 
    });
};

module.exports = { addExerciseByWorkoutId };

