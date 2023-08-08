require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes import
const workoutsAPI = require('./routes/workouts-api');
const exercisesAPI = require('./routes/exercises-api');
const login = require('./routes/login');

// Use routes
app.use('/workouts', workoutsAPI);
app.use('/exercises', exercisesAPI);
app.use('/login', login);

app.listen(PORT, () => {
  console.log(`Application listening on port ${PORT}`);
});