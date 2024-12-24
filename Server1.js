const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3001;

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

// Endpoint to add a new allowance type
app.post('/add-allowance-type', async (req, res) => {
  const { Allowance_type } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO allowance_types (Allowance_type) VALUES ($1) RETURNING *',
      [Allowance_type]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to fetch all allowance types
app.get('/allowance-types', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM allowance_types');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Endpoint to add a new role
app.post('/add-role', async (req, res) => {
    const { role_name } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO roles (role_name) VALUES ($1) RETURNING *',
        [role_name]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  // Endpoint to fetch all roles
app.get('/roles', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM roles');
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Endpoint to delete a role
  app.delete('/delete-role/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM roles WHERE id = $1', [id]);
      res.status(200).json({ message: 'Role deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Endpoint to update a role
  app.put('/update-role/:id', async (req, res) => {
    const { id } = req.params;
    const { role_name } = req.body;
    try {
      const result = await pool.query(
        'UPDATE roles SET role_name = $1 WHERE id = $2 RETURNING *',
        [role_name, id]
      );
      res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// Endpoint to delete an allowance type
app.delete('/delete-allowance-type/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM allowance_types WHERE id = $1', [id]);
    res.status(200).json({ message: 'Allowance type deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to update an allowance type
app.put('/update-allowance-type/:id', async (req, res) => {
  const { id } = req.params;
  const { Allowance_type } = req.body;
  try {
    const result = await pool.query(
      'UPDATE allowance_types SET Allowance_type = $1 WHERE id = $2 RETURNING *',
      [Allowance_type, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to add a new budget
app.post('/add-budget', async (req, res) => {
  const { allowance_type_id, role_id, amount } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO budgets (allowance_type_id, role_id, amount) VALUES ($1, $2, $3) RETURNING *',
      [allowance_type_id, role_id, amount]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to fetch all budgets
app.get('/budgets', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM budgets');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to delete a budget
app.delete('/delete-budget/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM budgets WHERE id = $1', [id]);
    res.status(200).json({ message: 'Budget deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to update a budget
app.put('/update-budget/:id', async (req, res) => {
  const { id } = req.params;
  const { allowance_type_id, role_id, amount } = req.body;
  try {
    const result = await pool.query(
      'UPDATE budgets SET allowance_type_id = $1, role_id = $2, amount = $3 WHERE id = $4 RETURNING *',
      [allowance_type_id, role_id, amount, id]
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