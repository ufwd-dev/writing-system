'use strict';

const http = require('http');

const request = require('./src/request');

request('es6.ruanyifeng.com').then(data => {
	console.log(data);
}, err => {
	console.log(err);
});

require('./src/server');