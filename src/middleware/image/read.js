'use strict';

module.exports = function getImage(req, res, next) {
	const {axios} = req;
	const hash = req.params.hash;

	axios.get(`image/${hash}/regular/common`, {
		responseType: 'arraybuffer'
	}).then(response => {
		res.send(response.data);
	}, (err) => {
		res.sendStatus(err.response ? err.response.status : 500);
	}).then(() => {
		next();
	});
};