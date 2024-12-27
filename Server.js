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

// Endpoint to fetch all employees or employees with a specific role
app.get("/employees", async (req, res) => {
  const { role } = req.query;
  try {
    const query = role ? 'SELECT * FROM employees WHERE role = $1' : 'SELECT * FROM employees';
    const params = role ? [role] : [];
    const result = await pool.query(query, params);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to delete an employee
app.delete("/delete-employee/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM employees WHERE id = $1', [id]);
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to update an employee
app.put("/update-employee/:id", img(["uploads/profile_picture", "timestamp", "profile_picture"]), async (req, res) => {
  const { id } = req.params;
  const { name, email, contactNumber, role, managerName } = req.body;
  const profilePicture = req.file ? `/uploads/profile_picture/${req.file.filename}` : null;

  try {
    const result = await pool.query(
      'UPDATE employees SET name = $1, email = $2, contact_number = $3, profile_picture = COALESCE($4, profile_picture), role = $5, manager_name = $6 WHERE id = $7 RETURNING *',
      [name, email, contactNumber, profilePicture, role, managerName, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});