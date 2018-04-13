'use strict';

const axios = require('axios');
const config = require('./../../config.json');

module.exports = function createAxios(req, res, next) {
	const cookie = req.session.apiCookie;

	const options = {
		baseURL: config.api.baseUrl,
		headers: {
			'content-type': 'application/json'
		}
	};
	

	if (cookie) {
		options.headers.cookie = cookie;
	}

	req.axios = axios.create(options);
	
	next();
};