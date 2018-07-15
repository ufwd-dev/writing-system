'use strict';

module.exports = function getOwnArticleList(req, res, next) {
	const {axios} = req;
	const {keyword, published, examine} = req.query;
	const params = {};

	keyword ? params.keyword= keyword : undefined;

	published ? params.published = published  : undefined;
	
	examine ? params.examine = examine : undefined;

	axios.get('article', {params: params})
		.then(response => {
			res.send(response.data);
		}, err=> {
			res.sendStatus(err.response ? err.response.status : 500);
		}).then(() => {
			next();
		});
};