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

CREATE TABLE IF NOT EXISTS TravelVotes (
  id VARCHAR(36) PRIMARY KEY,
  travel_id VARCHAR(36) NOT NULL,
  user_id VARCHAR(36) NOT NULL,
  vou BOOLEAN DEFAULT FALSE,
  volto BOOLEAN DEFAULT FALSE,
  vou_e_volto BOOLEAN DEFAULT FALSE,
  nao_vou BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (travel_id) REFERENCES Travels(id),
  FOREIGN KEY (user_id) REFERENCES Users(id)
);