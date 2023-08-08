const db = require('../connection');

const getAllExercises = () => {
  return db
    .query(`
    SELECT * FROM exercises
    ORDER BY title`)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.log('Query Error: ', err);
    });
};


module.exports = { getAllExercises };