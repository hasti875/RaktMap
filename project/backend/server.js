require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bloodRequestsRouter = require('./routes/bloodRequests');
const User = require('./models/User');

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(bodyParser.json());

// Use routes
app.use('/blood-requests', authenticateToken, bloodRequestsRouter);

// 1. Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/raktmap', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('MongoDB connected'));

// 2. Define User schema/model



const SECRET = 'your_jwt_secret'; // Use env var in production

// 3. Registration endpoint
app.post('/register', async (req, res) => {
  let { email, password, role, name } = req.body;
  if (!email || !password || !role || !name) return res.status(400).json({ message: 'All fields required' });
  email = email.toLowerCase();
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: 'User already exists' });
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword, role, name });
  await user.save();
  res.status(201).json({ message: 'User registered successfully' });
});

// 4. Login endpoint
app.post('/login', async (req, res) => {
  let { email, password } = req.body;
  email = email.toLowerCase();
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
const token = jwt.sign({ id: user._id, email: user.email, role: user.role, name: user.name }, SECRET, { expiresIn: '1h' });  res.json({ token, role: user.role, name: user.name });
});

// Middleware to protect routes
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Example protected route
app.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ message: `Welcome, ${req.user.email}!`, role: req.user.role });
});

app.listen(5000, () => console.log('Server running on port 5000'));