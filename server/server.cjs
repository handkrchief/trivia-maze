const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3001;

// Enable CORS for React frontend
app.use(cors());

// Database connection
const dbPath = path.join(__dirname, 'db', 'trivia.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Failed to connect to database:', err.message);
        process.exit(1);
    }
    console.log('Connected to SQLite database.');
});

// GET endpoint for all questions with choices
app.get('/api/questions', (req, res) => {
    const sql = `
        SELECT 
            q.id AS question_id,
            q.category,
            q.question_text,
            q.correct_answer,
            c.choice_text
        FROM questions q
        JOIN choices c ON q.id = c.question_id
        ORDER BY q.category, q.id;
    `;

    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        // Format the response
        const questions = rows.reduce((acc, row) => {
            // Ensure category exists
            if (!acc[row.category]) {
                acc[row.category] = { questions: {} };
            }

            // Ensure question exists
            if (!acc[row.category].questions[row.question_id]) {
                acc[row.category].questions[row.question_id] = {
                    questionText: row.question_text,
                    correctAnswer: row.correct_answer,
                    choices: []
                };
            }

            // Add choice to the question
            acc[row.category].questions[row.question_id].choices.push(row.choice_text);

            return acc;
        }, {});

        res.json(questions);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
