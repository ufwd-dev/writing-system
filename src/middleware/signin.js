'use strict';

module.exports = function writerSignin(req, res, next) {
	const {axios} = req;

	axios.post('account/session', req.body).then((response) => {

		req.session.token = response.data.data.token;

		res.send(response.data);
	}, (err) => {
		res.send(err.message);
	}).then(() => next());
};