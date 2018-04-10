'use strict';

module.exports = function* updateOwnArtical(req, res, next) {
	const artical = res.locals.data;

	const newArtical = yield artical.update(req.body);

	res.send(newArtical);

	next();
};