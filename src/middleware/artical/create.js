'use strict';

module.exports = function createArticle(req, res, next) {
	const {axios} = req;

	axios.post('article', req.body).then(response => {
		res.sendStatus(response.status);
	}, (err) => {
		res.sendStatus(err.response.status);
	}).then(() => {
		next();
	});
};