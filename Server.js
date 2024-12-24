const { img } = require("vamtec"); // Import the image upload setup

const express = require('express');
const bodyParser = require('body-parser');

const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = 3001;
const cors = require('cors');
// PostgreSQL connection pool
const pool = new Pool({
    user: 'Sample',
    host: 'localhost',
    database: 'Mvc',
    password: 'password',
    port: 5432,
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Endpoint to handle form submission
app.post("/add-employee", img(["uploads/profile_picture", "timestamp", "profile_picture"]), async (req, res) => {
  const { name, email, contactNumber, role, managerName } = req.body;
  const profilePicture = `/uploads/profile_picture/${req.file.filename}`;

  try {
    const result = await pool.query(
      'INSERT INTO employees (name, email, contact_number, profile_picture, role, manager_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, email, contactNumber, profilePicture, role, managerName]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to fetch all employees
app.get("/employees", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employees');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});