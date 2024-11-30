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
const db = new sqlite3.Database(dbPath);

// GET endpoint for all questions
app.get('/api/questions', (req, res) => {
    db.all(`SELECT * FROM questions`, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        
        // Format response
        const questions = rows.reduce((acc, row) => {
            if (!acc[row.category]) {
                acc[row.category] = { questions: {} };
            }
            
            acc[row.category].questions[row.id] = {
                questionText: row.question_text,
                correctAnswer: row.correct_answer,
                choices: JSON.parse(row.choices || '[]')
            };
            
            return acc;
        }, {});
        
        res.json(questions);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});