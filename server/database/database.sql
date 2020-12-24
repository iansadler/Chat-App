CREATE DATABASE chat_app_database;

-- psql -U postgres
-- \c chat_app_database
-- \l
-- \dt

CREATE TABLE messages (
  message_id SERIAL PRIMARY KEY,
  message_text VARCHAR(255),
  sender VARCHAR(255),
  conversation_id INTEGER REFERENCES conversations (conversation_id)
);

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  google_id VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL
);

CREATE TABLE conversations (
  conversation_id SERIAL PRIMARY KEY,
  user_id_one INTEGER REFERENCES users (user_id),
  user_id_two INTEGER REFERENCES users (user_id)
);
