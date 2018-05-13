'use strict';

module.exports = function createClassification(req, res, next) {
	const {axios} = req;

	axios.post(`article/${req.params.articleId}/category`, req.body).then(response => {
		res.sendStatus(response.status);
	}, err => {
		res.sendStatus(err.response.status);
	}).then(() => {
		next();
	});
};