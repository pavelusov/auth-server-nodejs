// Starting point server
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

// 0. DB setup
mongoose.connect('mongodb://localhost:auth/auth', { useNewUrlParser: true });

// 1. App setup
// 1.1. Middleware
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));
// 1.2. Router
router(app);


// 2. Server setup
const PORT = process.env.PORT || 4000;
const server = http.createServer(app);
server.listen(PORT);
console.log('Server listening port: %s', PORT);
