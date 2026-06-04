// DispatchOS Backend - Express.js Server
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./db');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
const driversRouter = require('./routes/drivers');
const loadsRouter = require('./routes/loads');
const invoicesRouter = require('./routes/invoices');
const complianceRouter = require('./routes/compliance');
const notificationsRouter = require('./routes/notifications');
const settingsRouter = require('./routes/settings');

app.use('/api/drivers', driversRouter);
app.use('/api/loads', loadsRouter);
app.use('/api/invoices', invoicesRouter);
app.use('/api/compliance', complianceRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/settings', settingsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index3jay.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`DispatchOS API running on http://localhost:${PORT}`);
});

module.exports = app;
