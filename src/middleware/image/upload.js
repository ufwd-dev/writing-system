'use strict';

module.exports = function uploadImage(req, res, next) {
	const {axios} = req;

	axios.post('image', req.files.content, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	}).then(response => {
		res.send(response.data.data);
	}, (err) => {
		res.sendStatus(err.response ? err.response.status : 500);
	}).then(() => {
		next();
	});
};