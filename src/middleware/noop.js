'use strict';

module.exports = function getToken(req, res, next) {
	const {axios} = req;

	axios.get('noop').then((response) => {

		res.send(response.data.data);
	}, (err) => {
		res.send(err.message);
	}).then(() => next());
};