'use strict';

module.exports = function getArticleListOfCategory(req, res, next) {
	const {axios} = req;

	axios.get(`category/${req.params.categoryId}/article`).then(response => {
		res.send(response.data);
	}, (err) => {
		res.sendStatus(err.response ? err.response.status : 500);
	}).then(() => {
		next();
	});
};