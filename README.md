# Trivia Maze

A trivia-based maze game where players navigate through a maze by answering questions correctly. The game is now built using **React**, **Vite**, **TypeScript**, **JavaScript**, and **SQLite**, featuring modern additions like dark mode and item mechanics. Future plans include implementing trivia questions and save states.

---

## Features

- **Dark Mode**: A visually appealing dark theme to enhance gameplay experience.
- **Items (Coming Soon)**: Players can collect and use items as they progress through the maze.
- **Save States (Coming Soon)**: Allow players to save and resume their progress.

---

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/trivia-maze.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the app in your browser at http://localhost:5173.

---

## Database Setup

The game uses an SQLite database for managing trivia questions and related data.

1. Navigate to the database folder:
   ```bash
   cd src/db
   ```
2. Run the db-init.cjs script to create the SQLite database (trivia.db):
   ```bash
   node db-init.cjs
   ```
3. Run the seed-data.cjs script to populate the database with data from questions.json:
   ```bash
   node seed-data.cjs
   ```
   
---

## Archived Java Files

The original implementation of this project was written in Java. These files have been preserved in the java.old folder for historical reference and are no longer part of the active project.

---

## Contributors

- Caleb Carroll
- Zach Sanchez
- Ethan Moore

---

## Roadmap

1. Complete Save States: Allow players to save and load their progress.
2. Fetch Questions from Database: Random questions are fetched from the generated local database and used within the game.

---

## Tech Stack

- Frontend: React, Vite, TypeScript, Tailwind CSS
- Backend: SQLite
- Development Tools: SQLite Viewer, VSCode, npm

