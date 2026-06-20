const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const turnoRoutes = require('./routes/turnoRoutes');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/turnos', turnoRoutes);
module.exports = app;