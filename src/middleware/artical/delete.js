'use strict';

module.exports = function deleteOwnArticle(req, res, next) {
	const {axios} = req;

	axios.delete(`article/${req.params.articleId}`).then(response => {
		res.sendStatus(response.status);
	}, (err) => {
		res.sendStatus(err.response.status);
	}).then(() => {
		next();
	});
};