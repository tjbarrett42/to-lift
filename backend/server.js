const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Env variables in dotenv file
require('dotenv').config();

// Create express server
const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

// Get uri from mongodb atlas
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

