'use strict';

module.exports = function writerSignout(req, res, next) {
	const {axios} = req;
	
	axios.delete('account/session').then(response => {
		delete req.query.token;
		delete req.session.token;

		res.sendStatus(response.status);
	}, err => {
		res.sendStatus(err.response ? err.response.status : 500);
	}).then(() => {
		next();
	}).catch((err) => {
		console.log(err.message);
	});
};