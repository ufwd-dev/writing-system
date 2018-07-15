'use strict';

module.exports = function createArticle(req, res, next) {
	const {axios} = req;

	axios.post('article', req.body).then(response => {
		res.send(response.data);
	}, (err) => {
		res.sendStatus(err.response ? err.response.status : 500);
	}).then(() => {
		next();
	});
};