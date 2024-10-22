CREATE TABLE IF NOT EXISTS Admins (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Travels (

  id VARCHAR(36) PRIMARY KEY,
  name_viagem VARCHAR(255),
  destinoViagem VARCHAR(255),
  user_id VARCHAR(36),
  FOREIGN KEY (user_id) REFERENCES Users(id)
);


CREATE TABLE IF NOT EXISTS TravelStatus (
  id VARCHAR(36) PRIMARY KEY,
  vou BOOLEAN DEFAULT false,
  volto BOOLEAN DEFAULT false,
  vou_e_volto BOOLEAN DEFAULT false,
  nao_vou BOOLEAN DEFAULT false,
  travel_id VARCHAR(36) NOT NULL,
  FOREIGN KEY (travel_id) REFERENCES Travels(id) ON DELETE CASCADE
);