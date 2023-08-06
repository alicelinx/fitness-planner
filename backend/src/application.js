require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieSession({
  name: 'session',
  keys: ['0dm1c', 'c91lo', 't23kf'],
  maxAge: 24 * 60 * 60 * 1000
}));

// Routes import
const workoutsAPI = require('./routes/workouts-api');
const login = require('./routes/login');

// Use routes
app.use('/workouts', workoutsAPI);
app.use('/login', login);

app.get('/', (req, res) => {
  console.log(req.session);
  res.render('index', { user: req.session['user'] });
});

app.listen(PORT, () => {
  console.log(`Application listening on port ${PORT}`);
});