'use strict';

module.exports = function writerSignin(req, res, next) {
	const {axios} = req;

	axios.post('account/session', req.body).then((response) => {

		req.session.apiCookie = response.headers['set-cookie'][0];
		
		res.send(response.data);
	}, (err) => {
		res.sendStatus(err.response.status);
	}).then(() => next());
};