require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path'); // Move this up here

const JWT_SECRET = process.env.JWT_SECRET;
const rootRouter = require('./routes/index.js');

const app = express();
const PORT = process.env.PORT || 3500;

app.use(cors());
app.use(express.json());

// Serve Vite frontend files
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// API routes
app.use('/api/v1', rootRouter);

// Catch-all to serve the index.html file for any other route that doesn't match an API route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

// Catch 404 and forward to error handler
app.use((req, res) => {
    const err = new Error('File not found');
    err.status = 404;
    throw err;
});

// Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || "Oops! Something went wrong"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
