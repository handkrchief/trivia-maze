const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

// Create or open the SQLite database
const db = new sqlite3.Database("./trivia.db", err => {
  if (err) {
    console.error("Error opening database:", err);
    process.exit(1);
  }
});

db.serialize(() => {
  // Drop existing tables if they exist
  db.run("DROP TABLE IF EXISTS choices");
  db.run("DROP TABLE IF EXISTS questions"); 

  // Create questions table
  db.run(`
    CREATE TABLE questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question_text TEXT NOT NULL,
      correct_answer TEXT NOT NULL,
      category TEXT NOT NULL,
      type TEXT NOT NULL
    )
  `);

  // Create choices table
  db.run(`
    CREATE TABLE choices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question_id INTEGER NOT NULL,
      choice_text TEXT NOT NULL,
      is_correct BOOLEAN NOT NULL,
      FOREIGN KEY (question_id) REFERENCES questions (id)
    )
  `);

  console.log("Database tables created successfully");
});

db.close((err) => {
  if (err) {
    console.error("Error closing database:", err);
  } else {
    console.log("Database setup complete.");
  }
});
