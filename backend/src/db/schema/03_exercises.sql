DROP TABLE IF EXISTS exercises CASCADE;

CREATE TABLE exercises (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  set_number INT NOT NULL,
  rep_number INT NOT NULL,
  weight_number INT NOT NULL,
);