const db = require('../connection');

const getUserByEmailAndPassword = (body) => {
  return db
    .query(`
    SELECT * FROM users
    WHERE email = $1
    AND password = $2;`, [body.email, body.password])
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUserByEmailAndPassword };