CREATE DATABASE IF NOT EXISTS escape_musee;
USE escape_musee;

CREATE TABLE sessions (
  id VARCHAR(10) PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completedCities JSON,
  codes JSON
);

CREATE TABLE scores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_id VARCHAR(10),
  total_time INT,
  points INT,
  FOREIGN KEY (session_id) REFERENCES sessions(id)
);

CREATE TABLE logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_id VARCHAR(10),
  type ENUM('connection', 'enigma', 'progress', 'chat'),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rooms (
  id VARCHAR(10) PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('waiting', 'playing', 'finished') DEFAULT 'waiting'
);

CREATE TABLE room_players (
  id INT AUTO_INCREMENT PRIMARY KEY,
  room_id VARCHAR(10),
  user_id VARCHAR(50),
  role ENUM('agent', 'operator') NULL,
  is_ready BOOLEAN DEFAULT FALSE,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);
