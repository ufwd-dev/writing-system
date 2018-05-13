'use strict';

module.exports = function getAccountInformation(req, res, next) {
	const {axios} = req;

	axios.get('account').then(response => {
		res.send(response.data);
	}, (err) => {
		res.sendStatus(err.response.status);
	}).then(() => {
		next();
	});
};