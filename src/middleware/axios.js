'use strict';

const axios = require('axios');
const config = require('./../../config.json');

module.exports = function createAxios(req, res, next) {

	const options = {
		baseURL: config.api.baseUrl,
		headers: {
			'content-type': 'application/json'
		},
		params: {

		}
	};
	
	const token = req.session.token;

	if (token) {
		options.params.token = token;
	}

	req.axios = axios.create(options);
	
	next();
};