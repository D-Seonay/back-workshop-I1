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
