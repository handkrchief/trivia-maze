/**
 * @file seed-data.cjs
 * @description This file is used to seed the trivia database with questions and choices from an external JSON file.
 * It reads the questions.json file, parses the data, and inserts the questions and choices into the database tables.
 * @version 1.0
 * @author Ethan Moore
 */

const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

// Open the database
const db = new sqlite3.Database("./trivia.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
    process.exit(1);
  }
  console.log("Connected to the SQLite database.");
});

// Helper function to run SQL queries as a promise
function runQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        return reject(err);
      }
      resolve(this.lastID); // For insert statements, resolve with the ID of the inserted row
    });
  });
}

// Seed data from external file
async function seedDatabase() {
  try {
    // Read the questions.json file
    const data = fs.readFileSync("questions.json", "utf-8");
    const questions = JSON.parse(data);

    // Loop through each question
    for (const question of questions) {
      // Insert the question into the questions table
      const questionId = await runQuery(
        `INSERT INTO questions (question_text, correct_answer, category, type) 
         VALUES (?, ?, ?, ?)`,
        [question.question_text, question.correct_answer, question.category, question.type]
      );
      console.log(`Inserted question with ID: ${questionId}`);

      // Insert the choices into the choices table
      for (const choice of question.choices) {
        await runQuery(
          `INSERT INTO choices (question_id, choice_text, is_correct) 
           VALUES (?, ?, ?)`,
          [questionId, choice.choice_text, choice.is_correct]
        );
      }
      console.log(`Inserted choices for question ID: ${questionId}`);
    }
  } catch (error) {
    console.error("Error seeding the database:", error.message);
  } finally {
    // Close the database connection
    db.close((err) => {
      if (err) {
        console.error("Error closing database:", err.message);
      } else {
        console.log("Database seeding complete and connection closed.");
      }
    });
  }
}

// Run the seed function
seedDatabase();
