'use strict';

module.exports = function* deleteOwnArtical(req, res, next) {
	const artical = res.locals.data;

	const result = yield artical.destroy();

	res.send({
		destoryed: result
	});

	next();
};