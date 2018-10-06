// Starting point server
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

// App setup
// middleware
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));

// Server setup
const PORT = process.env.PORT || 4000;
const server = http.createServer(app);
server.listen(PORT);
console.log('Server listening port: %s', PORT);
