'use strict';

const {throwError} = require('error-standardize');
const sequelize = require('../../database');

module.exports = function* isPublished(req, res, next) {
	const Artical = sequelize.model('ufwdArtical');
	const writerId = req.session.accountId;
	const articalId = req.params.articalId;

	const artical = yield Artical.findOne({
		where: {
			id: articalId,
			author: writerId,
			published: 0
		}
	});

	if (!artical) {
		throwError('The artical is not allowed to operation.', 404);
	}

	res.locals.data = artical;

	next();
};