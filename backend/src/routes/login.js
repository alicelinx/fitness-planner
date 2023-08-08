const express = require('express');
const router = express.Router();
const loginQuery = require('../db/queries/login');


router.post('/', (req, res) => {
  loginQuery.getUserByEmailAndPassword(req.body)
    .then(data => {
      const user = data[0];
      res.json(user);
    }).catch(() => {
      return res.status(404).send('Unable to login, please check email/password');
    });
});

module.exports = router;