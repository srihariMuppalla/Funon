const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors  = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 5000;

// Create a connection to the SQLite3 database
const db = new sqlite3.Database(path.join(__dirname, 'funon.db'));

// Middleware to parse JSON data
app.use(express.json());

// Function to hash a password
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

// Function to validate user input
function validateUserInput(firstname, lastname, email, phone, dob, password) {
  // Add your validation logic here
  // For example:
  if (!firstname || !lastname || !email || !phone || !dob || !password) {
    throw new Error('All fields are required');
  }

  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    throw new Error('Invalid email address');
  }

  // Add more validation logic as needed
}

// Registration route
app.post('/register', async (req, res) => {
  try {
    const { firstname, lastname, email, phone, dob, password } = req.body;

    await validateUserInput(firstname, lastname, email, phone, dob, password);

    // Check if the user already exists
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (row) {
        return res.status(409).json({ error: 'Mail already exists' });
      }

      // Hash the password
      const hashedPassword = await hashPassword(password);

      // Insert the new user into the database
      db.run('INSERT INTO users (firstname, lastname, email, phone, dob, password) VALUES (?, ?, ?, ?, ?, ?)', 
        [firstname, lastname, email, phone, dob, hashedPassword], 
        (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists and the password is correct
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!row) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check the password
    const isValid = await bcrypt.compare(password, row.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // User is authenticated, send user information
    const user = {
      firstname: row.firstname,
      lastname: row.lastname,
      email: row.email,
      phone: row.phone,
    };

    // User is authenticated, you can generate a token or session here
    res.json({ message: 'Login successful', user });
  });
});

// Fetch active users
app.get('/api/users', async (req, res) => {
  try {
    const users = await db.all('SELECT * FROM users');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Connect to user's video call
app.post('/api/calls/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    // Implement the logic to connect to the user's video call
    res.json({ message: 'Connected to user' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Send message
app.post('/api/messages', async (req, res) => {
  try {
    const { sender, text } = req.body;
    // Implement the logic to store the message in the database
    res.json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create the users table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    dob TEXT NOT NULL,
    password TEXT NOT NULL
  )
`, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});
