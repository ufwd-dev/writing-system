'use strict';

const axios = require('axios');
const config = require('../config');

const options = {
	
};

module.exports = function axios() {
	
	return new Promise((resolve, reject) => {

		const req = http.request({
			hostname
		}, (res) => {

			res.on('timeout', (chunk) => {
				reject(chunk);
			});
			res.on('data', (chunk) => {
				resolve(chunk);
			});
			res.on('end', () => {
				console.log('No more data in response.');
			});
			
		});
		
		req.on('error', (err) => {
			reject(err);
		});

		req.end();
	});
};

