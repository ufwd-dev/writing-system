'use strict';

module.exports = function getThumbnail(req, res, next) {
	const {axios} = req;
	const {hash, regularName} = req.params;

	axios.get(`thumbnail/${hash}/regular/${regularName}`, {
		responseType: 'arraybuffer'
	}).then(response => {
		res.send(response.data);
	}, (err) => {
		res.sendStatus(err.response.status);
	}).then(() => {
		next();
	});
};