'use strict';

module.exports = function getOwnArticleList(req, res, next) {
	const {axios} = req;
	const {keyword, published, examine} = req.query;

	let url = 'article';
	
	keyword ? url = url + '?' + `keyword=${keyword}` : undefined;

	published && keyword ? url = url + '&' + `published=${published}` :
		(published ? url = url + '?' + `published=${published}` : undefined);
	
	examine && (published || keyword) ? url = url + '&' + `examine=${examine}` :
		(examine ? url = url + '?' + `examine=${examine}` : undefined);

	axios.get(url)
		.then(response => {
			res.send(response.data);
		}, err=> {
			res.sendStatus(err.response.status);
		}).then(() => {
			next();
		});
};