const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth.route');
app.use('/v1/api', authRoutes);

module.exports = app;