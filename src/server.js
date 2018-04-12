'use strict';

const config = require('../config.json');

const http = require('http');
const app = require('./app');

const server = http.createServer(app);

server.listen(config.listen);