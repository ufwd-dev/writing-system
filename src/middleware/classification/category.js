'use strict';

module.exports = function getClassificationList(req, res, next) {
	const {axios} = req;

	axios.get(`article/${req.params.articleId}/category`)
		.then(response => {
			res.send(response.data);
		}, err=> {
			res.sendStatus(err.response.status);
		}).then(() => {
			next();
		});
};