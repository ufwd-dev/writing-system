'use strict';

module.exports = function deletelassification(req, res, next) {
	const {axios} = req;

	axios.delete(`article/${req.params.articleId}/category/${req.params.categoryId}`).then(response => {
		res.sendStatus(response.status);
	}, err => {
		res.sendStatus(err.response.status);
	}).then(() => {
		next();
	});
};