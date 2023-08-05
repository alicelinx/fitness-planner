DROP TABLE IF EXISTS workouts_exercises CASCADE;

CREATE TABLE workouts_exercises(
  id SERIAL PRIMARY KEY NOT NULL,
  workout_id INTEGER REFERENCES workouts(id) ON DELETE CASCADE,
  exercise_id INTEGER REFERENCES exercises(id) ON DELETE CASCADE
);