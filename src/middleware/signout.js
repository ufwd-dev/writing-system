'use strict';

module.exports = function writerSignout(req, res, next) {
	const {axios} = req;
	
	axios.delete('account/session').then(response => {
		req.session.apiCookie ? delete req.session.apiCookie : undefined;
		
		res.sendStatus(response.status);
	}, err => {
		res.sendStatus(err.response.status);
	}).then(() => {
		next();
	});
};