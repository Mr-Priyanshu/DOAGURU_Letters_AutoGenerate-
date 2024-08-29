// auth
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
const RegisterAuth = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, 'line 9 Auth');
  

  try {
    // Check if the user already exists
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
      if (results.length > 0) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Insert the new user into the database Check krene ke bad
      db.query('INSERT INTO users SET ?', { username, password: hashedPassword }, (err, result) => {
        console.log(username);
        
        if (err) throw err;

        const payload = { user: { id: result.insertId } };
        const token = jwt.sign(payload, 'secretKey', { expiresIn: '1h' });

        res.status(201).json({ token });
      });
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};


// Login a user 
const LoginAuth =  async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
      if (results.length === 0) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const user = results[0];

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const payload = { user: { id: user.id } };
      const token = jwt.sign(payload, 'secretKey', { expiresIn: '1h' });

      res.json({ token });
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {RegisterAuth, LoginAuth};
