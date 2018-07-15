'use strict';

module.exports = function getOwnArticle(req, res, next) {
	const {axios} = req;

	axios.get(`article/${req.params.articleId}`).then(response => {
		res.send(response.data);
	}, (err) => {
		res.sendStatus(err.response ? err.response.status : 500);
	}).then(() => {
		next();
	});
};