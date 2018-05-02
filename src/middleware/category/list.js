'use strict';

module.exports = function getCategoryList(req, res, next) {
	const {axios} = req;
	const {keyword} = req.query;
	const params = {};

	keyword ? params.keyword= keyword : undefined;

	axios.get('category', {params: params})
		.then(response => {
			res.send(response.data);
		}, err=> {
			res.sendStatus(err.response.status);
		}).then(() => {
			next();
		});
};