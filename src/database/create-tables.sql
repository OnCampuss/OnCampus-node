CREATE TABLE IF NOT EXISTS Users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Travels (

  id VARCHAR(36) PRIMARY KEY,
  name_viagem VARCHAR(255),
  volto_in_viagem VARCHAR(255),
  vou_in_viagem VARCHAR(255),
  vou_and_volto_viagem VARCHAR(255),
  destinoViagem VARCHAR(255),
  user_id VARCHAR(36),
  FOREIGN KEY (user_id) REFERENCES Users(id)
);
