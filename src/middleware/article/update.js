'use strict';

module.exports = function updateOwnArticle(req, res, next) {
	const {axios} = req;

	axios.put(`article/${req.params.articleId}`, req.body).then(response => {
		res.sendStatus(response.status);
	}, err => {
		res.sendStatus(err.response ? err.response.status : 500);
	}).then(() => {
		next();
	});
};