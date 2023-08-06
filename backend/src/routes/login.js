const express = require('express');
const router = express.Router();
const loginQuery = require('../db/queries/login');


router.post('/', (req, res) => {
  loginQuery.getUserByEmailAndPassword(req.body)
    .then(data => {
      const user = data[0];
      req.session = {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      };
      res.json(req.session.user);
      return;
    }).catch(() => {
      return res.status(404).send('Unable to login, please check email/password');
    });
});

module.exports = router;