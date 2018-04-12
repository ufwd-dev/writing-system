'use strict';

// const axios = require('axios');

module.exports = function createArtical(req, res, next) {

	// axios({
	// 	method: req.method,
	// 	url: '',
	// 	data: req.body
	// }).then( => {

	// });

	const container = req.body;

	res.send(container);

	next();
};