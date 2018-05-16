'use strict';

const config = require('../../../config.json');

module.exports = function uploadImage(req, res, next) {
	const {axios} = req;

	axios.post('image', req.files.content, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	}).then(response => {
		const hash = response.data.data.hash;

		res.send({
			default: `http://${config.api.host}:${config.api.port}/api/image/${hash}/regular/common`
		});
	}, (err) => {
		res.sendStatus(err.response.status);
	}).then(() => {
		next();
	});
};